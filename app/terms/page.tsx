import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Scale } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service - QuoteGenerator",
  description: "Read the terms and conditions for using QuoteGenerator's Bible quote art creation service.",
}

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 text-center">Terms of Service</CardTitle>
              <p className="text-gray-600 text-center">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using QuoteGenerator, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                <p className="text-gray-600">
                  QuoteGenerator is a web-based service that allows users to create beautiful, shareable images from
                  Bible quotes using AI-powered background generation. Our service includes daily quote recommendations,
                  mood-based search, and social media sharing capabilities.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
                <div className="space-y-4 text-gray-600">
                  <p>To access certain features, you may need to create an account. You agree to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Acceptable Use</h2>
                <div className="space-y-4 text-gray-600">
                  <p>You agree not to use QuoteGenerator to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Create content that is offensive, harmful, or inappropriate</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on intellectual property rights</li>
                    <li>Distribute spam or malicious content</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the service for commercial purposes without permission</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    The Bible quotes used in our service are from the English Standard Version (ESV), used by
                    permission. All rights reserved.
                  </p>
                  <p>
                    Images generated through our service are provided for personal, non-commercial use. You retain
                    rights to images you create, but agree not to use them in ways that violate these terms.
                  </p>
                  <p>
                    Our service, including its design, functionality, and content, is protected by copyright and other
                    intellectual property laws.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Subscription and Payments</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    QuoteGenerator offers both free and paid subscription plans. Paid subscriptions provide additional
                    features and higher usage limits.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Subscription fees are billed in advance</li>
                    <li>You may cancel your subscription at any time</li>
                    <li>Refunds are provided according to our refund policy</li>
                    <li>We reserve the right to change pricing with notice</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy and Data</h2>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our{" "}
                  <Link href="/privacy" className="text-amber-600 hover:text-amber-700 underline">
                    Privacy Policy
                  </Link>{" "}
                  to understand how we collect, use, and protect your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-gray-600">
                  QuoteGenerator is provided "as is" without any warranties, express or implied. We do not guarantee
                  that the service will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600">
                  In no event shall QuoteGenerator be liable for any indirect, incidental, special, consequential, or
                  punitive damages arising out of your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Legal Questions & Contact</h2>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-gray-700 mb-4">
                    For questions about these Terms of Service or legal matters, please contact our legal team:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/contact?type=legal">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/70 border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Scale className="w-4 h-4 mr-2" />
                        Legal Inquiry
                      </Button>
                    </Link>

                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-white/70 border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        General Contact
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600">
                      <strong>Legal Email:</strong> Athena1592025@outlook.com
                      <br />
                      <strong>Terms Questions:</strong> Athena1592025@outlook.com
                      <br />
                      <strong>Response Time:</strong> Legal inquiries are reviewed within 3-5 business days
                      <br />
                      <strong>Mailing Address:</strong> 123 Faith Street, Christian City, CC 12345
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
