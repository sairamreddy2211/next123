# PipeCode Admin - Interactive Learning Platform

A modern Next.js learning platform that provides interactive coding experiences with problem-solving, video learning, and comprehensive course management tools for educators and administrators.

## 🚀 Quick Start

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [New Course Management System](#new-course-management-system)
- [Admin Dashboard](#admin-dashboard)
- [Course Editor](#course-editor)
- [Modal Editor System](#modal-editor-system)
- [Mock API System](#mock-api-system)
- [Component Architecture](#component-architecture)
- [Theme System](#theme-system)
- [Customer Views](#customer-views)
- [Data Management](#data-management)
- [Development Guide](#development-guide)

## 🏗️ Architecture Overview

This is a Next.js 14+ application built with TypeScript, featuring:

- **App Router** - Modern Next.js routing system
- **Server & Client Components** - Optimized rendering strategy
- **TypeScript** - Full type safety across the application
- **Course Management System** - Complete course creation and editing workflow
- **Modal-based Editors** - State-preserving section editors in overlay modals
- **Mock API Layer** - Simulated backend with consistent data structures
- **Theme System** - Centralized dark/light mode with custom colors
- **Component Architecture** - Modular, reusable components

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── admin/                   # Admin panel routes
│   │   ├── page.tsx            # NEW: Course Dashboard (landing page)
│   │   ├── course-editor/       # NEW: Complete course creation interface
│   │   │   └── page.tsx        # Course editor with module/section management
│   │   └── problem-editor/      # Enhanced: Dual-purpose problem/video editor
│   │       └── page.tsx        # Supports both problem and video creation
│   ├── learn/                   # Learning/video content
│   └── practice/                # Interactive problem solving
├── components/                   # All React components
│   ├── admin/                   # Admin-specific components
│   │   ├── EditorModal.tsx     # NEW: Full-screen modal for section editing
│   │   ├── CourseForm.tsx      # NEW: Course metadata form
│   │   ├── ModuleManager.tsx   # NEW: Module creation and management
│   │   ├── SectionEditor.tsx   # NEW: Section management with drag-and-drop
│   │   ├── CoursePreview.tsx   # NEW: Course preview modal
│   │   ├── ProblemForm.tsx     # Enhanced: Supports both problems and videos
│   │   ├── VideoForm.tsx       # NEW: Video content creation form
│   │   └── [other admin components]
│   ├── common/                  # Layout & navigation
│   ├── learning/                # Video learning components
│   ├── problem-solving/         # Interactive problem components
│   ├── providers/               # Context providers
│   ├── shared/                  # Reusable components
│   └── ui/                      # Base UI components
├── lib/                         # Utility functions & API layers
│   ├── courseManager.ts        # Course data management utilities
│   ├── mockApiCalls.ts         # NEW: Complete mock API for course management
│   ├── theme.ts                # Theme configuration
│   └── utils.ts                # General utilities
├── constants/                    # Application constants & data
├── data/                        # Mock data & content
├── models/                      # TypeScript interfaces
├── public/                      # Static assets
└── types/                       # Global type definitions
```

## 🎓 New Course Management System

### Overview
Complete course creation and management workflow with hierarchical structure:
- **Courses** → **Modules** → **Sections** (Problems or Videos)

### Key Features
- ✅ **Course Dashboard** - Landing page showing all courses with filtering
- ✅ **Course Creation Modal** - Quick course creation with title and description
- ✅ **Full Course Editor** - Complete course structure management
- ✅ **Modal-based Section Editing** - State-preserving editors for problems and videos
- ✅ **Drag-and-Drop Reordering** - For both modules and sections
- ✅ **Mock API Integration** - Simulated backend with persistent data
- ✅ **Status Management** - Draft and published course states

## 🏠 Admin Dashboard

### Location: `/app/admin/page.tsx`
**NEW**: Complete landing page for course management

### Features:
1. **Course Overview**
   - Statistics showing published vs draft courses
   - Filter tabs: All Courses, Published, Drafts
   - Real-time course counts

2. **Course Management**
   - List all existing courses with metadata
   - Edit buttons for each course
   - Course status badges (Published/Draft)
   - Last updated timestamps

3. **Create Course Modal**
   - Quick course creation form
   - Required: Course title
   - Optional: Course description
   - Auto-navigation to course editor after creation

### User Flow:
1. Access `/admin` → See course dashboard
2. Click "Create New Course" → Modal opens
3. Enter course details → Course created
4. Automatically redirected to course editor with new course ID
5. OR click "Edit Course" on existing course → Open course editor

## 📚 Course Editor

### Location: `/app/admin/course-editor/page.tsx`
**ENHANCED**: Complete course structure management interface

### Architecture:
```
Course Editor
├── Course Information Form (title, description, category, status)
├── Module Management (add, edit, delete, reorder modules)
├── Section Management (add, edit, delete, reorder sections)
├── Modal Editors (problem editor, video editor)
└── Actions (save draft, publish, preview)
```

### Key Components:

#### 1. **CourseForm** (`/components/admin/CourseForm.tsx`)
- Course metadata editing (title, description, category)
- Save Draft / Publish buttons
- Reset functionality
- Auto-save status indicators

#### 2. **ModuleManager** (`/components/admin/ModuleManager.tsx`)
- Add new modules with title and description
- Drag-and-drop module reordering
- Module deletion with confirmation
- Module selection for section editing

#### 3. **SectionEditor** (`/components/admin/SectionEditor.tsx`)
- Section creation (Problem or Video type)
- Inline section editing (title, description, duration)
- Section type switching (video ↔ problem)
- Edit buttons that open modal editors
- Drag-and-drop section reordering within modules

### Modal Editor Integration:
- Clicking "Edit" on any section opens the appropriate modal
- Problem sections → Problem Editor in modal
- Video sections → Video Editor in modal
- State preservation when switching between editors

## 🔧 Modal Editor System

### Location: `/components/admin/EditorModal.tsx`
**NEW**: Full-screen modal wrapper for section editing

### Purpose:
Solves the state loss problem when navigating between editors by keeping the course editor state intact while editing sections in modal overlays.

### Architecture:
```typescript
EditorModal {
  props: {
    isOpen: boolean;
    sectionType: 'problem' | 'video';
    moduleId: string;
    sectionId: string;
    onSave: (sectionId: string) => void;
    onClose: () => void;
  }
}
```

### Features:
1. **Full-screen Overlay** - Modal covers entire viewport
2. **URL Parameter Management** - Sets `mode=video` for video editing
3. **localStorage Setup** - Provides editing context to existing editor
4. **Message Communication** - Listens for save events from editor
5. **State Preservation** - Course editor state remains intact
6. **Close Button** - Styled close button with proper z-index

### Integration with Existing Editor:
- Reuses existing `/app/admin/problem-editor/page.tsx`
- Editor switches between problem/video mode based on URL parameter
- No code duplication - same editor component in different contexts

## 🔌 Mock API System

### Location: `/lib/mockApiCalls.ts`
**NEW**: Comprehensive mock API for course management

### Purpose:
Simulates real backend functionality with consistent data structures and realistic delays.

### API Methods:

#### Course Management:
```typescript
// Get all courses (published + draft)
getAllCourses(): Promise<Course[]>

// Get courses by status
getCoursesByStatus(status: 'published' | 'draft'): Promise<Course[]>

// Create new course
createCourse(title: string, description?: string): Promise<Course>

// Get specific course
getCourse(courseId: string): Promise<Course | null>

// Update existing course
updateCourse(courseId: string, updates: Partial<Course>): Promise<Course | null>

// Delete course
deleteCourse(courseId: string): Promise<boolean>

// Save complete course data
saveCourse(courseData: Course): Promise<string>
```

#### Section Management:
```typescript
// Save section content (problem or video)
saveSection(sectionData: any, type: 'problem' | 'video'): Promise<string>
```

### Data Structure:
Maintains complete course hierarchy with consistent JSON structure:

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  version: number;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  type: 'video' | 'problem';
  description: string;
  duration?: string;
  order: number;
  sectionId?: string; // Reference to actual content
}
```

### Mock Data:
Includes sample courses for testing:
- "Advanced Data Structures" (Published)
- "System Design Fundamentals" (Draft)

## 🧩 Component Architecture

### Core Principles
- **Separation of Concerns** - Course management, content editing, and presentation are clearly separated
- **State Management** - Proper state flow from dashboard → course editor → modal editors
- **Reusability** - Modal system reuses existing editor components
- **Type Safety** - All components use consistent TypeScript interfaces
- **Theme Integration** - All components support the centralized theme system

### Enhanced Admin Components:

#### 1. **Course Management Components**
- **`CourseDashboard`** - Main landing page with course list and creation
- **`CourseForm`** - Course metadata editing with validation
- **`ModuleManager`** - Module CRUD operations with drag-and-drop
- **`SectionEditor`** - Section management within modules
- **`CoursePreview`** - Modal preview of complete course structure
- **`EditorModal`** - Full-screen modal wrapper for section editing

#### 2. **Enhanced Problem/Video Editor**
- **`ProblemEditor`** (Enhanced) - Now supports both problems and videos
- **`VideoForm`** - NEW: Video content creation form
- **`ProblemForm`** - Enhanced: Better integration with course structure
- **URL-based Mode Switching** - `mode=video` parameter switches editor type

#### 3. **Existing Customer Components** (Unchanged)
- Learning components for video playback
- Problem-solving components for interactive coding
- Shared components for common functionality

## 🎨 Theme System

### Architecture (Unchanged)
The theme system continues to provide:
- **Dark/Light Mode Toggle** - Seamless switching between themes
- **Centralized Colors** - All colors defined in one place
- **Component Integration** - Every component uses theme colors
- **Persistence** - Theme preference saved in localStorage

### Enhanced Integration:
- All new course management components fully support theming
- Modal overlays respect theme colors
- Consistent styling across dashboard → course editor → modal editors

## 🎓 Customer Views (Unchanged)

### 1. **Learn Page** (`/app/learn/`)
Video-based learning interface continues to work as before.

### 2. **Practice Page** (`/app/practice/`)
Interactive problem-solving interface continues to work as before.

## 📊 Data Management

### Enhanced Data Layer:

#### 1. **Course Manager** (`/lib/courseManager.ts`)
Utilities for course data management and validation.

#### 2. **Mock API** (`/lib/mockApiCalls.ts`)
Complete simulated backend with:
- In-memory data storage
- Realistic API delays
- Consistent response formats
- Error handling

#### 3. **Constants** (`/constants/index.ts`)
Enhanced with:
- Course category options
- Default course templates
- Video content structure templates

## 🔄 User Workflows

### Course Creation Workflow:
1. **Access Dashboard**: Navigate to `/admin`
2. **Create Course**: Click "Create New Course" → Modal opens
3. **Enter Details**: Provide title and optional description
4. **Auto-redirect**: Automatically navigate to course editor
5. **Build Structure**: Add modules and sections
6. **Edit Content**: Click edit on sections to open modal editors
7. **Save & Publish**: Save as draft or publish when ready

### Course Editing Workflow:
1. **Access Dashboard**: Navigate to `/admin`
2. **Select Course**: Click "Edit Course" on existing course
3. **Course Editor Opens**: Loads with course data pre-filled
4. **Edit Structure**: Modify modules, sections, metadata
5. **Edit Content**: Use modal editors for section content
6. **Save Changes**: Update course with changes

### Section Editing Workflow:
1. **In Course Editor**: Click "Edit" on any section
2. **Modal Opens**: Full-screen overlay with appropriate editor
3. **Edit Content**: Use problem editor or video editor
4. **Save Section**: Content saved and modal closes
5. **Return to Course**: Course editor state preserved
6. **Continue Editing**: Edit more sections or course structure

## 🚀 Development Guide

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Key Routes
- **`/admin`** - NEW: Course management dashboard (landing page)
- **`/admin/course-editor?courseId={id}`** - Course structure editing
- **`/admin/problem-editor?mode=video`** - Video content editing (in modal)
- **`/admin/problem-editor`** - Problem content editing (in modal or standalone)
- **`/learn`** - Video learning interface
- **`/practice`** - Interactive problem solving

### Development Patterns:

#### 1. **Course Data Flow**:
```
Dashboard → Create/Edit → Course Editor → Modal Editors → Save → Update Course
```

#### 2. **State Management**:
- Course list state in dashboard
- Course structure state in course editor
- Section content state in modal editors
- Communication via props and callbacks

#### 3. **API Integration**:
```typescript
// Always use mock API calls
import { mockApiCalls } from '@/lib/mockApiCalls';

// Course operations
const courses = await mockApiCalls.getAllCourses();
const course = await mockApiCalls.createCourse(title, description);
const saved = await mockApiCalls.saveCourse(courseData);
```

#### 4. **Modal Editor Pattern**:
```typescript
// In course editor
const handleEditSection = (sectionId: string, type: 'problem' | 'video') => {
  setEditingSectionId(sectionId);
  setEditorModalType(type);
  setShowEditorModal(true);
};

// EditorModal handles the rest
<EditorModal
  isOpen={showEditorModal}
  sectionType={editorModalType}
  moduleId={selectedModuleId}
  sectionId={editingSectionId}
  onSave={handleSectionSaved}
  onClose={() => setShowEditorModal(false)}
/>
```

### Development Tips:
1. **Theme Usage** - Always use `useTheme()` hook for colors
2. **Component Structure** - Follow the established folder organization
3. **Type Safety** - Use TypeScript interfaces from `/models/` and `/lib/courseManager`
4. **Mock API** - Use mock API calls for all data operations
5. **State Preservation** - Use modal pattern for editors to preserve state
6. **Course Structure** - Maintain hierarchy: Course → Module → Section

## 🔄 Recent Major Updates

### Course Management System (NEW):
- ✅ Complete course dashboard with create/edit functionality
- ✅ Full course editor with module and section management
- ✅ Modal-based section editing system
- ✅ Mock API layer with realistic backend simulation
- ✅ State preservation across editor navigation
- ✅ Drag-and-drop reordering for modules and sections

### Architecture Improvements:
- ✅ Removed top navigation tabs (Dashboard, Course Editor, Problem Editor)
- ✅ Centralized course management in single dashboard
- ✅ Enhanced existing problem editor to support video content
- ✅ Modal overlay system for seamless editing experience
- ✅ Consistent JSON data structures across all components

### UI/UX Enhancements:
- ✅ Clean course dashboard with filtering and statistics
- ✅ Intuitive course creation workflow
- ✅ Professional course editor interface
- ✅ Full-screen modal editors with proper close buttons
- ✅ Responsive design for all new components

---

This documentation provides a comprehensive guide for understanding the complete course management system, architectural decisions, and development patterns. Any developer or AI agent can use this README to understand and extend the platform.

## 📖 Future Considerations

The current system provides a solid foundation for:
- Real backend API integration (replace mock APIs)
- User authentication and course ownership
- Course publishing and marketplace features
- Advanced content types (quizzes, assignments)
- Progress tracking and analytics
- Collaborative course creation
# pipecode-admin
