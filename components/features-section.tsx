import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Palette, Share2, Calendar, Heart, Download } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Daily Recommendations",
      description: "Start each day with a carefully selected verse that speaks to your heart",
      color: "text-amber-600",
    },
    {
      icon: Search,
      title: "Precise Search",
      description: "Find any Bible verse instantly by entering its reference (e.g., John 3:16)",
      color: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Mood Matching",
      description: "Discover verses that match your current emotions and spiritual needs",
      color: "text-red-600",
    },
    {
      icon: Palette,
      title: "AI Art Generation",
      description: "Transform verses into beautiful visual art with AI-generated backgrounds",
      color: "text-green-600",
    },
    {
      icon: Download,
      title: "High-Quality Downloads",
      description: "Save your creations in high resolution for printing or digital use",
      color: "text-orange-600",
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Share your inspirational verse images directly to social media platforms",
      color: "text-purple-600",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-cream-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you discover, create, and share inspiring Bible verses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-amber-200/30"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
