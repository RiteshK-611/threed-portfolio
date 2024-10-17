import { Dock, DockIcon } from "@/components/ui/dock";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navLinks } from "@/contants";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-10 flex origin-bottom h-full max-h-14">
      <Dock
        direction="middle"
        className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "
      >
        {Object.entries(navLinks).map(([name, nav]) => (
          <DockIcon key={name}>
            <Link
              href={nav.url}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "rounded-full"
              )}
            >
              <nav.icon className="size-5" />
            </Link>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
