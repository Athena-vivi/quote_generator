import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Users, Award, Mail, MessageSquare } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export const metadata = {
  title: "About Us - QuoteGenerator",
  description: "Learn about QuoteGenerator's mission to help people share faith through beautiful Bible quote art.",
}

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 py-20 px-4 max-w-screen-lg mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">About QuoteGenerator</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering believers to share God's Word through beautiful, AI-generated art that inspires and encourages
            others in their faith journey.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 text-center flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 text-center leading-relaxed">
              At QuoteGenerator, we believe that God's Word has the power to transform lives. Our mission is to make it
              easier for believers to share the beauty and wisdom of Scripture through visually stunning, shareable
              content. By combining the timeless truth of the Bible with cutting-edge AI technology, we're helping
              people spread hope, encouragement, and faith across social media platforms and beyond.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg text-center">
            <CardHeader>
              <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">AI-Powered Art</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our advanced AI technology creates unique, beautiful backgrounds that perfectly complement each Bible
                quote, making every image special and meaningful.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Community Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built by believers, for believers. We understand the importance of sharing faith and have designed every
                feature with the Christian community in mind.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg text-center">
            <CardHeader>
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-800">Quality Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We use the trusted English Standard Version (ESV) Bible and ensure every quote is accurate, meaningful,
                and presented with the respect it deserves.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-600">
            <p className="text-lg leading-relaxed">
              QuoteGenerator was born from a simple observation: in our digital age, people are constantly sharing
              content on social media, but meaningful, faith-based content often gets lost in the noise. We saw an
              opportunity to change that.
            </p>
            <p className="text-lg leading-relaxed">
              Our team of developers, designers, and believers came together with a shared vision: to create a tool that
              would make it effortless for anyone to share the beauty of God's Word. We wanted to combine the timeless
              wisdom of Scripture with modern technology to create something truly special.
            </p>
            <p className="text-lg leading-relaxed">
              Today, thousands of users rely on QuoteGenerator to create inspiring content that reaches millions of
              people worldwide. Every image created through our platform is a small act of evangelism, spreading hope
              and encouragement to those who need it most.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 text-center">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Biblical Accuracy</h3>
                <p className="text-gray-600">
                  We are committed to presenting God's Word with complete accuracy and respect, using trusted
                  translations and maintaining the integrity of Scripture.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">User Privacy</h3>
                <p className="text-gray-600">
                  Your privacy matters to us. We protect your personal information and never share your data without
                  your explicit consent.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Accessibility</h3>
                <p className="text-gray-600">
                  We believe everyone should have access to God's Word. Our platform is designed to be inclusive and
                  accessible to users of all backgrounds and abilities.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our technology to provide the best possible experience while staying true to
                  our mission of spreading God's Word.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 text-center">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              We'd love to hear from you! Whether you have questions, suggestions, or just want to share how
              QuoteGenerator has impacted your ministry, we're here to listen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-white/70 border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Mail className="w-6 h-6" />
                  <span>General Inquiries</span>
                </Button>
              </Link>

              <Link href="/contact?type=feedback">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-white/70 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>Send Feedback</span>
                </Button>
              </Link>

              <Link href="/contact?type=partnership">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-white/70 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Users className="w-6 h-6" />
                  <span>Partnerships</span>
                </Button>
              </Link>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> Athena1592025@outlook.com
              </p>
              <p>
                <strong>Support:</strong> Athena1592025@outlook.com
              </p>
              <p>
                <strong>Partnerships:</strong> Athena1592025@outlook.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
