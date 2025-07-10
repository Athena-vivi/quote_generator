import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Mail } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy - QuoteGenerator",
  description: "Learn how QuoteGenerator protects your privacy and handles your personal information.",
}

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 text-center">Privacy Policy</CardTitle>
              <p className="text-gray-600 text-center">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <h3 className="text-xl font-medium text-gray-700">Personal Information</h3>
                  <p>
                    When you create an account with QuoteGenerator, we collect information such as your name, email
                    address, and any profile information you choose to provide.
                  </p>

                  <h3 className="text-xl font-medium text-gray-700">Usage Data</h3>
                  <p>
                    We automatically collect information about how you use our service, including the Bible quotes you
                    search for, images you generate, and features you use. This helps us improve our service.
                  </p>

                  <h3 className="text-xl font-medium text-gray-700">Device Information</h3>
                  <p>
                    We collect information about the device you use to access QuoteGenerator, including IP address,
                    browser type, operating system, and device identifiers.
                  </p>

                  <h3 className="text-xl font-medium text-gray-700">Cookies and Tracking</h3>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience, remember your
                    preferences, and analyze site usage. You can control cookie settings through your browser.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Provide and maintain our Bible quote generation service</li>
                  <li>Process your requests and generate AI-powered images</li>
                  <li>Send you important updates about our service</li>
                  <li>Improve our algorithms and user experience</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share information
                    in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Service Providers:</strong> We work with trusted third-party services (like AI image
                      generation APIs) to provide our service
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law or to protect our rights and users
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets
                    </li>
                    <li>
                      <strong>Advertising Partners:</strong> We use Google AdSense to display ads, which may use cookies
                      to show relevant advertisements
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Google AdSense and Advertising</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    QuoteGenerator uses Google AdSense to display advertisements. Google AdSense uses cookies to serve
                    ads based on your prior visits to our website or other websites.
                  </p>
                  <p>
                    You may opt out of personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      className="text-amber-600 hover:text-amber-700 underline"
                    >
                      Google's Ads Settings
                    </a>
                    .
                  </p>
                  <p>
                    For more information about Google's privacy practices, please visit{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="text-amber-600 hover:text-amber-700 underline"
                    >
                      Google's Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibent text-gray-800 mb-4">6. Your Rights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Object to processing of your data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Children's Privacy</h2>
                <p className="text-gray-600">
                  QuoteGenerator is not intended for children under 13. We do not knowingly collect personal information
                  from children under 13. If you believe we have collected such information, please contact us
                  immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us About Privacy</h2>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy or how we handle your personal information, we're
                    here to help:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/contact?type=privacy">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/70 border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Inquiry
                      </Button>
                    </Link>

                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/70 border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        General Contact
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-200">
                    <p className="text-sm text-gray-600">
                      <strong>Direct Email:</strong> Athena1592025@outlook.com
                      <br />
                      <strong>Response Time:</strong> We respond to privacy inquiries within 48 hours
                      <br />
                      <strong>Phone:</strong> +1 (555) 123-4567 (Monday-Friday, 9 AM - 5 PM EST)
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
