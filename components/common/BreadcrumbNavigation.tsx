"use client";

import Link from 'next/link';
import { Breadcrumb } from '@/models/navigation';

interface BreadcrumbNavigationProps {
  breadcrumbs: Breadcrumb[];
}

export default function BreadcrumbNavigation({ breadcrumbs }: BreadcrumbNavigationProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-white">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              {crumb.href ? (
                <Link href={crumb.href} className="text-gray-400 hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="text-gray-600">/</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
