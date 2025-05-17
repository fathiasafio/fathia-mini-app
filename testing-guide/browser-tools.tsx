// This is a reference guide, not actual code

// In Chrome/Edge/Firefox, you can use the device emulation tools:
// 1. Right-click on your page and select "Inspect" or press F12
// 2. Click the "Toggle device toolbar" icon (or press Ctrl+Shift+M in Chrome)
// 3. Select from preset devices or set custom dimensions

// Common screen sizes to test:
const deviceSizes = {
  // Mobile phones
  iPhone12: { width: 390, height: 844 },
  iPhone8: { width: 375, height: 667 },
  Pixel5: { width: 393, height: 851 },
  GalaxyS20: { width: 360, height: 800 },

  // Tablets
  iPad: { width: 768, height: 1024 },
  iPadPro: { width: 1024, height: 1366 },

  // Desktops
  laptop: { width: 1366, height: 768 },
  desktop: { width: 1920, height: 1080 },
}

// You can also test different orientations:
const orientations = ["portrait", "landscape"]
