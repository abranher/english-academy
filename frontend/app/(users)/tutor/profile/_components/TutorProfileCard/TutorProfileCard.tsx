"use client";

import { useCallback, useRef, useState } from "react";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import { User } from "@/types/models/User";
import { Avatar } from "@heroui/react";
import { assetAttachments, assetImg } from "@/libs/asset";
import { formatDateShort } from "@/libs/date";
import Avvvatars from "avvvatars-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/shadcn/ui/card";
import {
  CalendarDays,
  CheckCircle,
  File,
  FileText,
  ImageIcon,
  Loader2,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import { FullName } from "./FullName";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { formatSize, truncateString } from "@/libs/format";

type UploadStatus = "select" | "uploading" | "done" | "error";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function TutorProfileCard({ userTutor }: { userTutor: User }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [preview, setPreview] = useState<string>("");
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("select");

  const handleSubmitPopover = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true })); // or formRef.current.submit();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }, []),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxSize: MAX_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          toast.error("La imagen es demasiado grande (máximo 5MB)");
        } else {
          toast.error("Formato de imagen no permitido");
        }
      });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await axios.post(
        `/api/tutors/files/signup/${userTutor.id}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percent);
          },
        }
      );

      setUploadStatus("done");
      toast.success("¡Imagen de perfil creada correctamente!");
    } catch (error) {
      setUploadStatus("error");
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || "Error al subir la imagen";
        toast.error(message);
      } else {
        toast.error("Error desconocido");
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(undefined);
    setPreview("");
    setProgress(0);
    setUploadStatus("select");
  };

  return (
    <>
      <section className="lg:col-span-3">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center p-6">
            <section className="w-full flex justify-end">
              <StatusBadge status={userTutor.tutor!.status} />
            </section>

            <section className="w-full flex flex-col items-center justify-center gap-2">
              <article className="w-full flex items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {userTutor.avatarUrl ? (
                      <Avatar
                        isBordered
                        className="w-24 h-24 cursor-pointer"
                        color="default"
                        src={assetImg(userTutor.avatarUrl)}
                      />
                    ) : (
                      <Avatar
                        isBordered
                        className="w-24 h-24 cursor-pointer"
                        color="default"
                        icon={<Avvvatars size={100} value={userTutor.email} />}
                      />
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Imagen de perfil</AlertDialogTitle>
                      {changeAvatar ? (
                        <>
                          <form ref={formRef} onSubmit={onSubmit}>
                            <div className="grid gap-4">
                              <div className="flex flex-col items-center gap-4 w-full">
                                <section className="flex justify-evenly gap-3">
                                  <article className="w-full flex justify-center items-center">
                                    {/* Vista previa */}
                                    {preview ? (
                                      <>
                                        <Avatar
                                          isBordered
                                          className="w-40 h-40"
                                          color="default"
                                          src={preview}
                                        />
                                      </>
                                    ) : (
                                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-200">
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                          <ImageIcon className="w-8 h-8 text-gray-400" />
                                        </div>
                                      </div>
                                    )}
                                  </article>

                                  <article className="w-full text-xs">
                                    <h2 className="text-sm font-medium mb-2">
                                      Consejo:
                                    </h2>
                                    <div className="px-5">
                                      <ul className="list-disc flex flex-col gap-2">
                                        <li>
                                          Imagen clara y centrada de tu rostro.
                                        </li>
                                        <li>
                                          Evita fotos en las que solo se vea la
                                          mitad de tu cara.
                                        </li>
                                        <li>Utiliza un fondo sencillo.</li>
                                        <li>
                                          Sonríe y muestra una expresión
                                          amigable.
                                        </li>
                                      </ul>
                                    </div>
                                  </article>
                                </section>

                                <section className="flex gap-3">
                                  {/* Dropzone */}
                                  {(uploadStatus === "select" ||
                                    uploadStatus === "uploading") && (
                                    <section
                                      {...getRootProps()}
                                      className="p-3 w-full text-center bg-gray-50 dark:bg-zinc-900 text-gray-600 dark:text-gray-100 font-semibold text-xs rounded h-28 sm:h-24 flex flex-col items-center justify-center cursor-pointer border-3 border-gray-500 dark:border-zinc-700 border-dashed"
                                    >
                                      <UploadCloud className="w-11 mb-2" />
                                      <input
                                        {...getInputProps()}
                                        className="hidden"
                                      />
                                      {isDragActive ? (
                                        <p>Suelta los archivos aquí ...</p>
                                      ) : (
                                        <p>
                                          Arrastra y suelta tus archivos aquí o{" "}
                                          <span className="font-medium text-blue-600 hover:underline">
                                            explora
                                          </span>
                                        </p>
                                      )}
                                    </section>
                                  )}

                                  <Card className="w-full grid grid-cols-8 py-2 border-zinc-500 border-2">
                                    <div className="col-span-2 flex justify-center items-center">
                                      <File />
                                    </div>
                                    <div className="text-xs col-span-4 flex flex-col justify-center gap-1">
                                      <p>
                                        {selectedFile
                                          ? truncateString(
                                              selectedFile.name,
                                              "xs"
                                            )
                                          : "No hay ningún archivo seleccionado"}
                                      </p>
                                      <p>
                                        {selectedFile &&
                                          formatSize(selectedFile.size)}
                                      </p>
                                      <Progress
                                        value={progress}
                                        className="h-2"
                                      />
                                    </div>
                                    {uploadStatus === "select" &&
                                      selectedFile && (
                                        <>
                                          <div className="col-span-2 flex justify-center items-center">
                                            <XIcon
                                              className="cursor-pointer"
                                              onClick={clearFile}
                                            />
                                          </div>
                                        </>
                                      )}
                                    {uploadStatus === "uploading" && (
                                      <>
                                        <div className="col-span-1 flex justify-center items-center">
                                          {progress}
                                        </div>
                                      </>
                                    )}
                                    {uploadStatus === "done" && (
                                      <>
                                        <div className="col-span-1 flex justify-center items-center">
                                          <CheckCircle />
                                        </div>
                                      </>
                                    )}
                                  </Card>
                                </section>
                              </div>

                              <div className="flex justify-end gap-2 items-center">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setChangeAvatar(false);
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={handleSubmitPopover}
                                  disabled={
                                    !selectedFile ||
                                    uploadStatus === "uploading"
                                  }
                                >
                                  {uploadStatus === "uploading" ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    "Subir"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <section className="flex justify-center pt-4">
                            {userTutor.avatarUrl ? (
                              <Avatar
                                isBordered
                                className="w-52 h-52"
                                color="default"
                                src={assetImg(userTutor.avatarUrl)}
                              />
                            ) : (
                              <Avatar
                                isBordered
                                className="w-52 h-52"
                                color="default"
                                icon={
                                  <Avvvatars
                                    size={215}
                                    value={userTutor.email}
                                  />
                                }
                              />
                            )}
                          </section>
                          <section className="pt-5 flex justify-end gap-3">
                            <AlertDialogCancel>Cerrar</AlertDialogCancel>

                            <Button
                              onClick={() => {
                                setChangeAvatar(true);
                              }}
                            >
                              Cambiar
                            </Button>
                          </section>
                        </>
                      )}
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>
              </article>
            </section>
          </CardHeader>
          <CardContent>
            <section className="flex flex-col gap-3">
              <article className="flex gap-2 flex-col">
                <FullName
                  userId={userTutor.id}
                  name={userTutor.name}
                  lastName={userTutor.lastName}
                />

                <CardDescription className="flex gap-2 items-center">
                  @{userTutor.username}
                </CardDescription>
              </article>

              <article>
                <CardDescription className="flex gap-2 items-center">
                  0 Cursos
                </CardDescription>
              </article>

              <article>
                <CardDescription className="flex gap-2 items-center">
                  De venezuela
                </CardDescription>
              </article>

              <article>
                <CardDescription className="flex gap-2 items-center">
                  <CalendarDays className="w-4" />
                  {formatDateShort(userTutor.createdAt)}
                </CardDescription>
              </article>

              {userTutor.tutor!.cvUrl && (
                <Button asChild className="w-full" aria-label="Ver currículum">
                  <a
                    href={assetAttachments(userTutor.tutor!.cvUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    currículum
                  </a>
                </Button>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
