"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone } from "lucide-react";
import { milestones, stats, values } from "@/data/AllData";



function StatsCard({ stat }) {
  const IconComponent = stat.icon;
  
  return (
    <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-2 border-pink-100 hover:border-pink-200 transition-all duration-300 hover:shadow-lg group">
      <CardContent className="p-0">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-pink-600" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
          {stat.number}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          {stat.label}
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineItem({ milestone, index }) {
  const IconComponent = milestone.icon;
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} mb-12`}>
      {/* Content */}
      <div className="flex-1 text-center lg:text-left">
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl group">
          <CardContent className="p-0">
            <Badge className="mb-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              {milestone.year}
            </Badge>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">
              {milestone.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {milestone.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Icon */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-pink-300 to-transparent"></div>
      </div>

      {/* Empty space for alternating layout on desktop only */}
      <div className="hidden lg:flex flex-1"></div>
    </div>
  );
}

function ValueCard({ value }) {
  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl group">
      <CardContent className="p-0">
        <div className="text-center">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {value.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">
            {value.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {value.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function About() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 logo">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Hawi Crotchets</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A passion project turned into a labor of love, creating beautiful handmade pieces that bring warmth and joy to homes and hearts.
          </p>
        </div>

        {/* Hero Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div 
                className="overflow-hidden bg-gradient-to-br from-pink-200 to-purple-200 p-1"
                style={{
                  clipPath: "polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)",
                  borderRadius: "2rem",
                }}
              >
                <div 
                  className="overflow-hidden bg-white"
                  style={{
                    clipPath: "polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)",
                  }}
                >
                  <img
                    src="/loise.jpg"
                    alt="Hawi working on a crochet project"
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
              
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Hi, I'm Loise! 👋
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                What started as a simple hobby during my college years has blossomed into a beautiful journey 
                of creativity and connection. I discovered the meditative art of crocheting during a particularly 
                stressful semester, and it quickly became my sanctuary.
              </p>
              <p>
                Each piece I create carries a story - from the late-night sessions working on baby blankets 
                for expecting friends, to the custom scarves that have traveled across the world. I believe 
                that handmade items carry an energy and warmth that mass-produced goods simply cannot match.
              </p>
              <p>
                Today, Hawi Crotchets is more than just a business - it's a community of people who 
                appreciate the beauty of slow fashion, sustainable crafting, and the irreplaceable 
                value of items made with intention and love.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>hello@hawicrotchets.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+254 72894143</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Journey in Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            My Crochet Journey
          </h3>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What We Stand For
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Own Story?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Let's create something beautiful together. Browse our collection or reach out for custom orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-black hover:bg-white hover:text-pink-600 px-8 py-3 rounded-full font-semibold"
            >
              Custom Order
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}