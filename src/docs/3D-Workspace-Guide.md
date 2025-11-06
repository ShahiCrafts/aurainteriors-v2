# 3D Interior Design Workspace Guide

## Overview

The 3D Interior Design Workspace allows you to create realistic room layouts using 3D furniture models. This feature provides an immersive design experience with:

- **Real 3D Models**: All furniture is rendered as true 3D objects
- **Interactive Controls**: Rotate camera, move furniture, and customize colors
- **Realistic Lighting**: Dynamic shadows and lighting effects
- **Easy-to-Use Interface**: Simple click-to-add workflow

## Getting Started

### Adding Furniture

1. Browse the **Furniture Library** on the right side
2. Click on any furniture item to add it to your scene
3. The item will appear at the center of the room

### Navigation Modes

#### View Mode
- **Rotate Camera**: Click and drag anywhere in the scene
- **Zoom**: Use mouse scroll wheel
- **Pan**: Right-click and drag (or two-finger drag on trackpad)

#### Move Mode
- Select a furniture item by clicking on it
- Switch to "Move" mode using the button
- Drag the arrows to reposition the item
- Items are constrained to the room boundaries

### Customizing Furniture

When you select a furniture item, you can:

1. **Change Color**: Choose from 8 preset colors
2. **Rotate**: Click "Rotate 45°" button to rotate in 45-degree increments
3. **Remove**: Delete the item from the scene
4. **View Position**: See exact X, Y, Z coordinates

## Furniture Models Available

The workspace includes 3D models for:

- **Sofas** - Modern 3-seater sofas with armrests
- **Dining Tables** - Rectangular tables for 6-8 people
- **Chairs** - Dining and accent chairs
- **Beds** - King-size platform beds with headboards
- **Coffee Tables** - Low center tables for living rooms
- **Bookshelves** - Tall shelving units with 5 shelves
- **Desks** - Office desks with drawers
- **Armchairs** - Comfortable accent chairs
- **Sideboards** - Storage cabinets
- **Plants** - Decorative potted plants
- **Lamps** - Floor lamps with lighting effects

## Saving & Exporting

### Save Design
1. Click the "Save" button
2. Enter a name for your design
3. Design is saved to your account

### Export Design
- Click "Export" to download as JSON
- File contains all furniture positions and settings
- Can be imported later (feature coming soon)

## Tips for Best Results

1. **Start with Large Items**: Place sofas, beds, and tables first
2. **Use View Mode for Planning**: Rotate the camera to see from all angles
3. **Layer Your Design**: Add smaller items like lamps and plants last
4. **Color Coordination**: Use the color picker to match your style
5. **Realistic Scale**: All furniture is proportionally sized

## Technical Details

### Technologies Used
- **Three.js**: Core 3D rendering engine
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Helper components and controls

### Performance
- Optimized for modern browsers
- Hardware acceleration recommended
- Best experience on desktop/laptop

## Troubleshooting

**Scene not loading?**
- Ensure your browser supports WebGL
- Try refreshing the page
- Update your graphics drivers

**Slow performance?**
- Reduce the number of furniture items
- Close other browser tabs
- Use a computer with dedicated graphics

**Can't move furniture?**
- Make sure you're in "Move" mode
- Ensure the item is selected (blue ring indicator)
- Try clicking directly on the furniture

## Future Features

- Import custom 3D models
- Texture customization
- Wall and floor materials
- Lighting controls
- Measurements and dimensions display
- AR preview integration
- Collaborative design mode
