# Knowledge Hub

A modern, responsive knowledge base and documentation platform built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features**
- 🔍 Real-time search functionality
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🖼️ Image support for articles
- 📋 Detailed article modal view
- 🏷️ Tag-based categorization
- 🎨 Modern gradient UI with smooth animations

## Structure

```
Knowledge-Hub/
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # Search and interactivity logic
├── data.json           # Article database
├── images/             # Article images (create this folder)
├── README.md           # This file
└── json.data           # Legacy data file
```

## How to Use

### 1. **Add/Update Articles**
Edit `data.json` and add articles with the following structure:

```json
{
  "id": 1,
  "title": "Article Title",
  "description": "Brief description of the article",
  "tags": ["tag1", "tag2", "tag3"],
  "image": "https://example.com/image.png",
  "link": "https://external-link.com",
  "content": {
    "overview": "Detailed overview",
    "complianceNotice": "Any compliance requirements",
    "agentActionSteps": ["Step 1", "Step 2"],
    "processFlow": [
      {
        "step": "Step name",
        "options": ["Option 1", "Option 2"]
      }
    ]
  },
  "sections": [
    {
      "step": "Section title",
      "description": "Description",
      "details": ["Detail 1", "Detail 2"]
    }
  ]
}
```

### 2. **Add Images**
- Store images in an `images/` folder in the repository
- Reference them in data.json as:
  ```
  "image": "https://raw.githubusercontent.com/damicogpatrick2020-gif/Knowledge-Hub/main/images/your-image.png"
  ```

### 3. **Organize by Category**
Use tags to categorize articles. The search bar searches across:
- Article titles
- Tags
- Descriptions

## Recent Enhancements

### Account Management
- Added detailed "Request to Update Email Address / Login Username" article
- Included security & compliance (POPIA) notices
- Added action station process flow with UI mockup reference
- Step-by-step agent action steps

### Technical Improvements
- Grid-based card layout
- Modal view for detailed articles
- Better image handling with fallback placeholders
- Enhanced responsive design
- Smooth animations and transitions

## Data Schema

| Field | Type | Description |
|-------|------|-------------|
| id | number | Unique article identifier |
| title | string | Article title |
| description | string | Brief description |
| tags | array | Array of tag strings for categorization |
| image | string | URL to featured image |
| thumbnail | string | URL to thumbnail (optional) |
| link | string | External link to full article |
| content | object | Detailed content with subsections |
| sections | array | Step-by-step sections |

## Search Capability

The search bar supports searching by:
- **Title**: Full text search in article titles
- **Tags**: Match any tag
- **Description**: Full text search in descriptions

Example searches:
- "reset username"
- "password"
- "order"
- "troubleshooting"

## Styling

The website uses:
- **Colors**: Green gradient (#11998e to #38ef7d)
- **Font**: Segoe UI, sans-serif
- **Layout**: CSS Grid with responsive breakpoints
- **Effects**: Smooth transitions and hover animations

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## GitHub Pages

This repository is set up for GitHub Pages. The website is automatically published at:
`https://damicogpatrick2020-gif.github.io/Knowledge-Hub/`

## Future Enhancements

- [ ] Add category/subcategory filtering
- [ ] Implement dark mode toggle
- [ ] Add search analytics
- [ ] Create admin panel for content management
- [ ] Add feedback/rating system
- [ ] Implement full-text search with filters
- [ ] Add related articles suggestions
- [ ] Create export to PDF functionality

## Contributing

To add or update articles:
1. Edit `data.json`
2. Add images to the `images/` folder
3. Commit and push changes
4. The website updates automatically via GitHub Pages

## License

This project is open source and available under the MIT License.

---

**Last Updated**: June 2026
**Version**: 2.0 (Enhanced with image support and detailed content)
