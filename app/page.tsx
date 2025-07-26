"use client";

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            PipeCode
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            The Ultimate Platform for Data Engineers
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Finally, a dedicated platform where data engineers can practice problems, 
            learn new skills, and advance their careers. Just like DSA for developers, 
            but specifically designed for data engineering challenges.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <SignedOut>
            <Link href="/practice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Start Practicing Now
              </button>
            </Link>
            <Link href="/api-demo">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                View API Demo
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            {/* Links for authenticated users - they can access courses */}
            <Link href="/practice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Start Practicing
              </button>
            </Link>
            <Link href="/courses">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                View Courses
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hands-on Problems</h3>
            <p className="text-gray-600">
              Solve real-world data engineering challenges covering ETL pipelines, 
              data modeling, streaming, and more.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Structured Courses</h3>
            <p className="text-gray-600">
              Follow comprehensive learning paths from beginner to advanced, 
              covering all essential data engineering concepts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Practice</h3>
            <p className="text-gray-600">
              Practice with live data environments, including SQL, Python, 
              Spark, and popular data engineering tools.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Master Key Data Engineering Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "SQL & Database Design",
              "ETL/ELT Pipelines", 
              "Apache Spark",
              "Data Warehousing",
              "Stream Processing",
              "Cloud Platforms",
              "Data Modeling",
              "Performance Optimization"
            ].map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="font-semibold text-gray-800">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Practice Problems</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-green-100">Structured Courses</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-xl">
            <div className="text-4xl font-bold mb-2">10k+</div>
            <div className="text-purple-100">Engineers Learning</div>
          </div>
        </div>

        {/* Problem Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Problem Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Data Pipeline Design", difficulty: "Beginner to Advanced", problems: "120+" },
              { title: "SQL Optimization", difficulty: "Intermediate", problems: "85+" },
              { title: "Streaming Analytics", difficulty: "Advanced", problems: "65+" },
              { title: "Data Quality & Testing", difficulty: "Intermediate", problems: "90+" },
              { title: "Cloud Architecture", difficulty: "Advanced", problems: "75+" },
              { title: "Performance Tuning", difficulty: "Expert", problems: "45+" }
            ].map((category, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{category.difficulty}</p>
                <p className="text-blue-600 font-semibold">{category.problems} problems</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Data Engineering Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of data engineers who are advancing their careers with PipeCode
          </p>
          <SignedOut>
            <Link href="/practice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Start Practicing Free
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/practice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Continue Practicing
              </button>
            </Link>
          </SignedIn>
        </div>
      </section>
    </div>
  );
}