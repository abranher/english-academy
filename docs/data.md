# Categories and subcategories

### 1. Reading

- **Reading comprehension:** Exercises and texts to improve your reading comprehension at different levels.
- **Reading for pleasure:** Books, articles, and short stories to enjoy reading in English.
- **Academic reading:** Academic texts, research articles, and preparation for exams like IELTS and TOEFL.
- **Business reading:** Business documents, reports, emails, and articles related to the business world.
- **News articles:** Current news on various topics to practice reading informative texts.
- **Literature:** Classic and contemporary works of literature in English.

### 2. Writing

- **Essay writing:** Guidance and exercises for writing essays of different types and formats.
- **Report writing:** How to structure and write clear and concise reports.
- **Email writing:** Templates and tips for writing formal and informal emails.
- **Creative writing:** Develop your creativity by writing stories, poems, and other creative texts.
- **Business writing:** Master professional writing for emails, proposals, and presentations.
- **Academic writing:** Learn to write academic essays, research papers, and theses.

### 3. Listening

- **Listening comprehension:** Exercises to improve your listening comprehension of different accents and speeds.
- **Podcasts:** A wide selection of English podcasts on various topics.
- **Lectures:** Extracts from lectures and talks to practice understanding formal speeches.
- **Conversations:** Everyday dialogues and conversations in different contexts.
- **Movies and TV shows:** Scenes from movies and TV series with comprehension exercises.
- **Music:** English songs with lyrics and activities to improve pronunciation and vocabulary.

### 4. Speaking

- **Fluency practice:** Conversations with native teachers to improve fluency.
- **Pronunciation:** Exercises and activities to improve pronunciation of sounds and intonation.
- **Conversation skills:** Learn how to hold conversations in different situations.
- **Public speaking:** Preparation for presentations and public speeches.
- **Business presentations:** How to give effective presentations in a business setting.
- **Role-playing:** Simulations of real-life situations to practice spoken English.

### 5. Grammar

- **Verb tenses:** Detailed explanation of English verb tenses and practical exercises.
- **Sentence structure:** How to construct correct and varied sentences.
- **Parts of speech:** Nouns, adjectives, verbs, adverbs, and other parts of speech.
- **Punctuation:** Punctuation rules for correct writing.
- **Vocabulary building:** Strategies for expanding your vocabulary and learning new words.

### 6. Vocabulary

- **General vocabulary:** Common words and expressions used in everyday English.
- **Academic vocabulary:** Vocabulary specific to academic settings.
- **Business vocabulary:** Terms and expressions used in the business world.
- **Idioms and phrasal verbs:** English idioms and phrasal verbs.
- **Word formation:** How to form new words from roots and prefixes.

### 7. Culture

- **American culture:** Cultural aspects of the United States.
- **British culture:** Cultural aspects of the United Kingdom.
- **Australian culture:** Cultural aspects of Australia.
- **Canadian culture:** Cultural aspects of Canada.
- **Other cultures:** Cultural aspects of other English-speaking countries.



"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Attachment, Class, ClassAttachment } from "@/types/models"; // Asegúrate de importar ClassAttachment
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAttachments } from "../../../_services/get-attachments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ClassAttachmentsFormSkeleton } from "./ClassAttachmentsFormSkeleton";
import { LoadingButton } from "@/components/common/LoadingButton";
import { AttachmentCard } from "./AttachmentCard";

import { CardContent } from "@/components/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export function ClassAttachmentsForm({
  userId,
  lessonClass,
}: {
  userId: string;
  lessonClass: Class;
}) {
  const queryClient = useQueryClient();
  const { classId, lessonId } = useParams();

  const {
    isPending,
    data: attachments,
    isError,
  } = useQuery<Attachment[]>({
    queryKey: ["get_attachments_form"],
    queryFn: () => getAttachments(userId),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { attachmentId: "" },
  });

  const mutation = useMutation({
    mutationFn: (lessonClass: { attachmentId: string }) =>
      axios.post(
        `/api/classes/${classId}/lesson/${lessonId}/attachment`,
        lessonClass
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_class", classId, lessonId],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Lección no encontrada",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ attachmentId: data.attachmentId });
  }

  const { isSubmitting, isValid } = form.formState;

  // Transformar ClassAttachment a Attachment
  const attachedAttachments: Attachment[] = lessonClass.attachments
    .map((classAttachment) => {
      const attachment = attachments?.find(
        (a) => a.id === classAttachment.attachmentId
      );
      return attachment ? { ...attachment } : null;
    })
    .filter((attachment): attachment is Attachment => attachment !== null);

  // Filtrar los attachments que ya están adjuntos a la clase
  const availableAttachments = attachments?.filter(
    (attachment) =>
      !lessonClass.attachments.some(
        (classAttachment) => classAttachment.attachmentId === attachment.id
      )
  );

  if (isPending) return <ClassAttachmentsFormSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los recursos</>;

  return (
    <>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="attachmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adjuntar recurso</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige un recurso para tu clase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Recursos</SelectLabel>
                        {availableAttachments?.map((attachment) => (
                          <SelectItem key={attachment.id} value={attachment.id}>
                            {attachment.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Selecciona un recurso para adjuntar a la clase.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <LoadingButton
                isLoading={mutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Adjuntar"
              />
            </div>
          </form>
        </Form>

        {/* Listar los attachments ya adjuntos */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recursos adjuntos</h3>
          <div className="flex flex-wrap gap-4">
            {attachedAttachments.map((attachment) => (
              <AttachmentCard
                key={attachment.id}
                attachment={attachment}
                userId={userId}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
}