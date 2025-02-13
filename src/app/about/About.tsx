'use client';

import React from 'react';
import { Bed, Utensils, Wifi, Users, Book, Dumbbell } from "lucide-react";

const Card = ({ className = "", ...props }) => (
  <div className={`rounded-lg border bg-white text-gray-800 shadow-md transition hover:shadow-lg ${className}`} {...props} />
);

const CardHeader = ({ className = "", ...props }) => (
  <div className={`flex flex-col space-y-2 p-6 md:p-8 ${className}`} {...props} />
);

const CardTitle = ({ className = "", ...props }) => (
  <h3 className={`text-2xl md:text-3xl font-bold leading-tight ${className}`} {...props} />
);

const CardDescription = ({ className = "", ...props }) => (
  <p className={`text-lg md:text-xl text-gray-600 ${className}`} {...props} />
);

const CardContent = ({ className = "", ...props }) => (
  <div className={`p-6 md:p-8 pt-0 ${className}`} {...props} />
);

// Badge component
const Badge = ({ className = "", ...props }) => (
  <div className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-blue-100 text-blue-800 ${className}`} {...props} />
);

export default function AboutHostelPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Welcome Section */}
        <section className="mb-16">
          <Card className="overflow-hidden">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">
                Welcome to BSA College Hostel
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                The BSA College Hostel provides a comfortable and conducive living environment for students of BSA College of Engineering & Technology. Located within the 11.5-acre campus in the heart of Mathura City, our hostel offers modern amenities and a supportive community for academic and personal growth.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge>Safe & Secure</Badge>
                <Badge>24/7 Support</Badge>
                <Badge>Modern Facilities</Badge>
                <Badge>Wi-Fi Enabled</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accommodation & Facilities */}
        <section className="grid gap-6 sm:gap-8 lg:grid-cols-2 mb-16">
          {/* Accommodation */}
          <Card>
            <CardHeader>
              <CardTitle>Accommodation</CardTitle>
              <CardDescription>Comfortable living spaces for students</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center">
                  <Bed className="mr-3 h-6 w-6 text-blue-600" />
                  Furnished rooms (single, double, and triple occupancy)
                </li>
                <li className="flex items-center">
                  <Utensils className="mr-3 h-6 w-6 text-blue-600" />
                  Modern mess facility with nutritious meals
                </li>
                <li className="flex items-center">
                  <Wifi className="mr-3 h-6 w-6 text-blue-600" />
                  High-speed Wi-Fi throughout the hostel
                </li>
                <li className="flex items-center">
                  <Users className="mr-3 h-6 w-6 text-blue-600" />
                  Common rooms for socializing and group studies
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card>
            <CardHeader>
              <CardTitle>Facilities</CardTitle>
              <CardDescription>Amenities to support student life</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center">
                  <Book className="mr-3 h-6 w-6 text-blue-600" />
                  24/7 library and study areas
                </li>
                <li className="flex items-center">
                  <Dumbbell className="mr-3 h-6 w-6 text-blue-600" />
                  Fitness center and sports facilities
                </li>
                <li className="flex items-center">
                  <Users className="mr-3 h-6 w-6 text-blue-600" />
                  Regular cultural and recreational activities
                </li>
                <li className="flex items-center">
                  <Utensils className="mr-3 h-6 w-6 text-blue-600" />
                  Hygienic and varied meal options
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* About Hostel Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>About Our Hostel</CardTitle>
              <CardDescription>A home away from home</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg md:text-xl mb-6">
                The BSA College Hostel is an integral part of the BSA College of Engineering & Technology, established in 1997. Our hostel provides a nurturing environment for students pursuing various courses including Engineering, Pharmacy, MBA, and MCA at both Diploma and Degree levels.
              </p>
              <p className="text-lg md:text-xl">
                We understand the importance of a comfortable living space in a student's academic journey. That's why our hostel is designed to offer not just accommodation, but a supportive community that fosters personal growth, cultural exchange, and lifelong friendships.
              </p>
              <p className="text-lg md:text-xl">
                Our dedicated staff ensures a safe, clean, and positive atmosphere, allowing students to focus on their studies while enjoying a fulfilling college life. With a range of facilities and regular events, we aim to make your stay at BSA College Hostel a memorable and enriching experience.
              </p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
