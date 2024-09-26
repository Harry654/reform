"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/NavBar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { BeatLoader } from "react-spinners";

export default function SupportPage() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to be inserted
    const issueData = {
      id: uuidv4(),
      createdBy: user?.uid || null,
      name,
      email,
      issueType,
      description,
      state: "open",
      createdAt: new Date().toISOString(), // Add a timestamp
    };

    setLoading(true);

    try {
      // Insert the issue into the 'issues' collection in Firestore
      await addDoc(collection(db, "issues"), issueData);

      console.log(
        "Support request submitted and saved to Firestore:",
        issueData
      );

      // Reset form fields
      setName("");
      setEmail("");
      setIssueType("");
      setDescription("");

      // Show a success message to the user
      alert(
        "Your support request has been submitted and saved. We'll get back to you soon!"
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding document to Firestore: ", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Get Support</CardTitle>
            <CardDescription>
              Fill out the form below to submit a support request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="issueType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Issue Type
                </label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 text-gray-100"
                disabled={loading}
              >
                {!loading ? (
                  "Submit Support Request"
                ) : (
                  <BeatLoader size={10} color="#ffffff" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
