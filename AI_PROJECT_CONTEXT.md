# AI Agent Context: Interactive Learning Platform

## Project Overview
I'm building a Next.js 15 interactive learning platform that combines LeetCode-style coding challenges with video-based courses. The platform allows users to practice coding problems with an integrated Monaco editor and watch educational videos - similar to platforms like DataCamp or Codecademy.

## Current Architecture & Structure

### Tech Stack
- **Framework**: Next.js 15.3.4 with TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react 4.7.0)
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono
- **React**: Version 19

### Directory Structure
```
next123/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (home page)
│   ├── practice/
│   │   └── page.tsx (LeetCode-style coding challenges)
│   └── learn/
│       └── page.tsx (video courses)
│
├── components/
│   ├── common/
│   │   ├── NavigationHeader.tsx (top navigation with breadcrumbs)
│   │   ├── LearningLayout.tsx (shared layout wrapper)
│   │   └── CourseOutlinePopup.tsx (course modules modal)
│   ├── learning/
│   │   ├── VideoLearningView.tsx (video player interface)
│   │   └── DocumentView.tsx (text-based lessons)
│   ├── problem-solving/
│   │   └── InteractiveLearningView.tsx (LeetCode-style split view)
│   └── shared/
│       ├── CodeEditor.tsx (Monaco editor wrapper)
│       └── MediaPlayer.tsx (video player component)
│
├── data/
│   └── learningContent.ts (mock course and problem data)
│
├── types/
│   └── index.ts (TypeScript interfaces)
│
└── public/
    └── assets/ (SVG icons and images)
```

### Key Features
1. **Practice Page** (`/practice`): LeetCode-style interface featuring:
   - Resizable split-panel layout (problem description | code editor)
   - Monaco editor with custom dark theme and syntax highlighting
   - Problem examples, constraints, and expandable hints
   - Test case execution and results display
   - Mouse-based panel resizing (no external libraries)

2. **Learn Page** (`/learn`): Video course interface with:
   - Video player with custom controls
   - Course progression tracking
   - Instructor information display
   - Course outline navigation

3. **Course Outline Popup**: Modal showing:
   - Course modules with progress indicators
   - Individual sections (video lessons, coding challenges)
   - XP tracking and completion status
   - Module expansion/collapse functionality

## Design System & Color Scheme

### Theme: "LeetCode Dark" Inspired
**Exact Color Palette:**
- **Primary Background**: `#000000` (pure black)
- **Secondary Background**: `#262626` (panels, headers, inputs)
- **Tertiary Background**: `#333333` (section headers, highlights, hover states)
- **Borders**: `#222222` (subtle borders throughout)
- **Text Primary**: `#FFFFFF` (white for headings)
- **Text Secondary**: `#F9FAFB` (light gray for body text)
- **Text Muted**: `#6B7280` (darker gray for secondary info)
- **Success**: `#10B981` (green for passed tests)
- **Error**: `#EF4444` (red for failed tests)
- **Warning**: `#F59E0B` (yellow for hints/warnings)

### Component Styling Patterns
- **Headers**: `#262626` background with `#222222` borders
- **Buttons**: Transparent background with `#222222` borders, hover with `#333333`
- **Code Examples**: `#333333` background with `#222222` borders
- **Input Fields**: `#262626` background with `#222222` borders
- **Modals/Popups**: `#262626` background with subtle shadows

## Current Implementation Details

### Monaco Editor Configuration
- **Custom Theme**: "leetcode-theme" with pure black background
- **Syntax Highlighting**: Configured for SQL, JavaScript, Python
- **Features Enabled**: Line numbers, bracket matching, word wrap
- **Features Disabled**: Minimap, selection highlighting
- **Colors**: Black background (`#000000`), line highlights (`#222222`)

### Layout System
- **Header**: Fixed position with breadcrumbs and course outline button
- **Resizable Panels**: Custom mouse event handlers (not using react-resizable)
- **Responsive Design**: Mobile-friendly breakpoints
- **Navigation**: Course outline popup replaces traditional content switcher

### Data Structure Examples
```typescript
// Course Module Structure
interface CourseModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'free' | 'premium';
  sections: CourseSection[];
}

// Coding Problem Structure
interface InteractiveLesson {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  problem: {
    description: string;
    examples: Array<{input: string; output: string}>;
    constraints: string[];
    starterCode: string;
  };
}
```

## Removed Features (Don't Suggest These)
- ❌ ContentSwitcher component (replaced with course outline)
- ❌ Orange accent colors (switched to LeetCode-style neutrals)
- ❌ External resizing libraries (using custom mouse handlers)
- ❌ Problem selector dropdown (simplified to direct problem display)

## Current State & What Works
✅ **Fully Implemented:**
- Black theme with exact color specifications
- Monaco editor with custom leetcode-theme
- Resizable panels with mouse interaction
- Course outline popup with module navigation
- Test results display with pass/fail indicators
- Navigation header with breadcrumbs

✅ **Color Scheme Applied To:**
- NavigationHeader (black background, #222222 button borders)
- InteractiveLearningView (resizable panels, #262626 left panel, black right panel)
- CodeEditor (black background, #262626 header, custom Monaco theme)
- Problem sections (headings with #333333 background)

## Development Guidelines

### When Working On This Project:
1. **Maintain Color Consistency**: Always use the exact hex codes specified above
2. **Follow Component Structure**: Keep the established folder organization
3. **TypeScript First**: Ensure proper interface definitions for all props
4. **Performance Considerations**: Avoid unnecessary re-renders, optimize Monaco editor
5. **Accessibility**: Maintain proper contrast ratios despite dark theme
6. **No External Libraries**: For UI components, prefer custom implementations

### Code Style Preferences:
- Use `"use client"` for interactive components
- Prefer interface over type for object shapes
- Use optional chaining (`?.`) for safer property access
- Implement hover states with subtle color transitions
- Use inline styles for custom colors not in Tailwind

### Common Patterns:
```tsx
// Color application pattern
style={{ backgroundColor: '#262626', borderColor: '#222222' }}

// Hover states
className="hover:bg-gray-900 transition-colors"

// Panel width management
style={{ width: `${panelWidth}%` }}
```

## What I Need Help With
When assisting with this project:
1. Maintain the established black color scheme exactly as specified
2. Follow existing component patterns and naming conventions
3. Ensure TypeScript interfaces are properly defined and used
4. Keep the LeetCode-inspired minimal, clean design aesthetic
5. Consider performance implications, especially for Monaco editor
6. Preserve the resizable panel functionality
7. Don't suggest features that were intentionally removed

## Example Requests You Can Help With:
- "Add a new feature to the course outline popup"
- "Fix styling inconsistencies in the problem display"
- "Create a new component for displaying user progress"
- "Optimize the Monaco editor performance"
- "Add new problem types or course content"
- "Implement keyboard shortcuts for the code editor"
- "Add animation effects while maintaining the color scheme"

## Important Notes:
- The project uses Next.js 15 with React 19 - ensure compatibility
- Monaco editor theme is fully customized - don't suggest VS Code themes
- All backgrounds should be pure black (#000000) unless specifically noted
- User interactions should feel smooth and responsive
- The design prioritizes readability and focus on coding/learning

Please ask clarifying questions if you need more details about any specific aspect of the implementation. Always reference this color scheme and structure when making suggestions or implementing features.
