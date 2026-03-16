# Data Files

These JSON files contain the content for your portfolio website. Update each file with your actual information.

## Files Overview

### profile.json
Your personal information displayed on the home page.
- **name**: Your full name
- **title**: Your job title/role
- **bio**: Array of paragraphs introducing yourself
- **photo**: Path to your profile photo (place in `/public/`)
- **location**: Where you're based
- **currentRole**: Your current position
- **focusAreas**: Array of your key focus areas/expertise
- **social**: Your social links (LinkedIn, GitHub, Email, etc.)
- **carePriorities**: Optional list of what you care about

### experiences.json
Your work history for the CV page.
- Array of job experiences
- **startDate/endDate**: Use year (e.g., "2024") or leave endDate null for current position
- **description**: Array of bullet points for each role
- **tags**: Optional tags like "Engineering", "Leadership", "Consulting"

### skills.json
Your technical skills for the CV page.
- Array of skills, each with **name** and **category**
- Skills are automatically grouped by category on the UI
- Example categories: "Languages", "Frameworks", "Cloud & Platform", "Tools"

### education.json
Your education history for the CV page.
- Array of educational qualifications
- **startYear/endYear**: If the same year, shows as single year on UI

### projects.json
Your project portfolio for the Projects page.
- Array of projects you want to showcase
- **link**: Optional, can be null for private projects
- **company**: Optional, for work-related projects

## How to Update

1. Edit each JSON file with your actual data
2. Keep the JSON structure intact (don't remove required fields)
3. For optional fields, you can use `null` or omit them
4. Place your profile photo in `/public/` and update the path in profile.json
5. Test locally with `bun dev` to see your changes

## Data Source

Currently using JSON files. The repository pattern allows easy migration to Firebase or other data sources in the future without changing the UI code.
