"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Building,
  HelpCircle,
  CalendarIcon,
  Loader2Icon,
  Wand2Icon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  useRewriteMessageMutation,
  useSubmitMessageMutation,
} from "@/store/contactFormApi";

export interface ContactFormData {
  subject: string;
  category: string;
  priority: string;
  message: string;
  contactMethod: string;
}

export default function ContactPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState<ContactFormData>({
    subject: "",
    category: "",
    priority: "medium",
    message: "",
    contactMethod: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteMessage] = useRewriteMessageMutation();
  const [submitMessage] = useSubmitMessageMutation();

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRewrite = async () => {
    setIsRewriting(true);
    try {
      const res = await rewriteMessage({ message: formData.message }).unwrap();
      handleInputChange("message", res.rewrittenMessage);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 1000);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitMessage(formData).unwrap();
      setSubmitStatus("success");

      // Reset form after success
      setFormData({
        subject: "",
        category: "",
        priority: "medium",
        message: "",
        contactMethod: "email",
      });
      setSubmitStatus("idle");
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCategories = [
    { value: "hr", label: "Human Resources", icon: User },
    { value: "it", label: "IT Support", icon: HelpCircle },
    { value: "payroll", label: "Payroll & Benefits", icon: Building },
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "emergency", label: "Emergency", icon: AlertCircle },
  ];

  const priorityLevels = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-200 text-red-900" },
  ];

  const contactMethods = [
    { value: "email", label: "Email Response", icon: Mail },
    { value: "phone", label: "Phone Call", icon: Phone },
    { value: "meeting", label: "Schedule Meeting", icon: CalendarIcon },
  ];

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1>Contact Support</h1>
          <p className="text-muted-foreground">
            Get in touch with HR, IT support, or other departments for
            assistance
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-muted-foreground text-sm">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">HR Email</p>
                  <p className="text-muted-foreground text-sm">
                    hr@company.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-muted-foreground text-sm">
                    Mon-Fri 9AM-5PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Submit a Request</span>
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as
              possible
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={String(user?.publicMetadata?.userName || "")}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.primaryEmailAddress?.emailAddress || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your inquiry"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                />
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Department *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center space-x-2">
                            <category.icon className="h-4 w-4" />
                            <span>{category.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={priority.color}>
                              {priority.label}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-2">
                <Label>Preferred Response Method</Label>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  {contactMethods.map((method) => (
                    <div key={method.value}>
                      <input
                        type="radio"
                        id={method.value}
                        name="contactMethod"
                        value={method.value}
                        checked={formData.contactMethod === method.value}
                        onChange={(e) =>
                          handleInputChange("contactMethod", e.target.value)
                        }
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={method.value}
                        className="hover:bg-accent peer-checked:border-primary peer-checked:bg-primary/5 flex cursor-pointer items-center space-x-2 rounded-lg border p-3"
                      >
                        <method.icon className="h-4 w-4" />
                        <span className="text-sm">{method.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide detailed information about your request..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
                <p className="text-muted-foreground text-xs">
                  Minimum 10 characters ({formData.message.length}/10)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRewrite}
                  disabled={
                    formData.message.length < 10 || isRewriting || isSubmitting
                  }
                >
                  {isRewriting ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <Wand2Icon className="size-4" />
                  )}
                  {isRewriting ? "Rewriting..." : "AI Rewrite"}
                </Button>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.subject ||
                    !formData.category ||
                    !formData.message ||
                    formData.message.length < 10
                  }
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Sent!
                    </>
                  ) : submitStatus === "error" ? (
                    <>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                <p className="font-medium">Request submitted successfully!</p>
              </div>
              <p className="mt-1 text-sm text-green-700">
                We'll get back to you within 24 hours during business days.
              </p>
            </CardContent>
          </Card>
        )}

        {submitStatus === "error" && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <p className="font-medium">Failed to submit request</p>
              </div>
              <p className="mt-1 text-sm text-red-700">
                Please try again or contact support directly.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
