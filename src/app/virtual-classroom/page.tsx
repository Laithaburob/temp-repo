"use client";

/* eslint-disable */

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function VirtualClassroomContent() {
  const searchParams = useSearchParams();
  const [classroomId, setClassroomId] = useState<string>("default-classroom");
  
  useEffect(() => {
    // Get classroomId from URL parameters or use default
    const urlClassroomId = searchParams?.get("classroomId");
    if (urlClassroomId) {
      setClassroomId(urlClassroomId);
    }
  }, [searchParams]);

  return (
    <div>
      <p>Classroom ID: {classroomId}</p>
      
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Virtual Classroom</CardTitle>
            <CardDescription>Join the virtual learning environment</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Classroom content will be displayed here.</p>
          </CardContent>
          <CardFooter>
            <Button>Enter Classroom</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function VirtualClassroomPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Virtual Classroom</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VirtualClassroomContent />
      </Suspense>
    </div>
  );
}
