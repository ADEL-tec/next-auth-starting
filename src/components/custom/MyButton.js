import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function ({ title }) {
  const { pending } = useFormStatus();

  return (
    <Button
      form="myForm"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Loading.." : title}
    </Button>
  );
}
