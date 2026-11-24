import { Avatar, AvatarFallback, AvatarImage } from "registry/default/ui/avatar";

export function AvatarSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="sm">
        <AvatarImage alt="@luck-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>LU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@luck-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>LU</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="@luck-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>LU</AvatarFallback>
      </Avatar>
    </div>
  );
}
