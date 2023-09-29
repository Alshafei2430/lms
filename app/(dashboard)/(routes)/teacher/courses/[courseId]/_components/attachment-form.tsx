"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { File, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";

import { Course, Attachment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}
const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const formSchema = z.object({
    url: z.string().min(1),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 p-4 rounded-md border bg-slate-100 ">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button
          className="flex items-center gap-x-2"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.a && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachment yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-x-2 rounded-md border border-sky-200 text-sky-700 bg-sky-100 p-2"
                >
                  <File className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete your course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
