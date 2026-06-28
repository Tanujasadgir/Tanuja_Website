import Foundation
import Vision
import CoreImage
import AppKit

// Usage: removebg <input> <output>
guard CommandLine.arguments.count == 3 else {
    FileHandle.standardError.write("Usage: removebg <input> <output>\n".data(using: .utf8)!)
    exit(2)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]

guard let nsImage = NSImage(contentsOfFile: inputPath),
      let tiff = nsImage.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let cgImage = bitmap.cgImage else {
    FileHandle.standardError.write("Failed to load image\n".data(using: .utf8)!)
    exit(1)
}

let ciInput = CIImage(cgImage: cgImage)
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([request])
    guard let result = request.results?.first else {
        FileHandle.standardError.write("No foreground instances found\n".data(using: .utf8)!)
        exit(1)
    }
    let maskPixelBuffer = try result.generateScaledMaskForImage(
        forInstances: result.allInstances,
        from: handler
    )
    let maskImage = CIImage(cvPixelBuffer: maskPixelBuffer)

    // Apply the mask as alpha to the original image
    let filter = CIFilter(name: "CIBlendWithMask")!
    filter.setValue(ciInput, forKey: kCIInputImageKey)
    filter.setValue(CIImage.empty(), forKey: kCIInputBackgroundImageKey)
    filter.setValue(maskImage, forKey: kCIInputMaskImageKey)

    guard let output = filter.outputImage else {
        FileHandle.standardError.write("Failed to composite\n".data(using: .utf8)!)
        exit(1)
    }

    let context = CIContext()
    let colorSpace = CGColorSpace(name: CGColorSpace.sRGB)!
    guard let outCG = context.createCGImage(output, from: ciInput.extent) else {
        FileHandle.standardError.write("Failed to render\n".data(using: .utf8)!)
        exit(1)
    }

    let rep = NSBitmapImageRep(cgImage: outCG)
    guard let pngData = rep.representation(using: .png, properties: [:]) else {
        FileHandle.standardError.write("Failed to encode PNG\n".data(using: .utf8)!)
        exit(1)
    }
    try pngData.write(to: URL(fileURLWithPath: outputPath))
    print("Wrote \(outputPath)")
    _ = colorSpace
} catch {
    FileHandle.standardError.write("Error: \(error)\n".data(using: .utf8)!)
    exit(1)
}
