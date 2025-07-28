import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Learn & Practice
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Master coding skills through interactive courses and problem-solving challenges.
            Build your expertise with hands-on learning and real-world applications.
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Learning Card */}
          <Link href="/learn" className="group">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group-hover:scale-105 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Learn</h2>
                <p className="text-gray-400 mb-6">
                  Comprehensive video courses with interactive content. Master SQL, data engineering, 
                  and programming through structured lessons and hands-on exercises.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm rounded-full">Video Lessons</span>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-sm rounded-full">Interactive Content</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm rounded-full">Study Notes</span>
                </div>
                <div className="text-orange-500 font-semibold group-hover:text-orange-400 transition-colors">
                  Start Learning →
                </div>
              </div>
            </div>
          </Link>

          {/* Practice Card */}
          <Link href="/practice" className="group">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group-hover:scale-105 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500/20 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                  <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Practice</h2>
                <p className="text-gray-400 mb-6">
                  Interactive problem-solving challenges and coding exercises. Sharpen your skills 
                  with step-by-step explanations and hands-on practice sessions.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm rounded-full">Problem Solving</span>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-sm rounded-full">Step-by-Step</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm rounded-full">Interactive Practice</span>
                </div>
                <div className="text-orange-500 font-semibold group-hover:text-orange-400 transition-colors">
                  Start Practicing →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-400 text-sm">
                Hands-on exercises and real-time feedback to accelerate your learning journey.
              </p>
            </div>
            
            <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Multiple Learning Modes</h3>
              <p className="text-gray-400 text-sm">
                Switch between video lessons, interactive practice, and reference materials seamlessly.
              </p>
            </div>
            
            <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-gray-400 text-sm">
                Monitor your learning progress with XP points and completion tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
