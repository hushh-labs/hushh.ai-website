import { redirect } from "next/navigation";

export default function HushhIdAliasPage({ params }) {
  const id = Array.isArray(params.id) ? params.id.join("/") : params.id;
  redirect(`/hushh-id/${id}`);
}
