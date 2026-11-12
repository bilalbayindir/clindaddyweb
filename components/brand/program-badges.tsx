import Image from "next/image";

import { features } from "@/lib/site";
import { cn } from "@/lib/utils";

import { NvidiaInceptionBadge } from "./nvidia-inception-badge";

/**
 * Startup program marks, shown side by side: NVIDIA Inception and AWS Activate.
 *
 * Both marks are used unmodified — no recolouring, cropping, filters or
 * opacity changes, and no dark-mode variants. Height is fixed at 32px on
 * mobile and 40px from `sm` up, so the badges stay visibly subordinate to the
 * ClinDaddy wordmark and wrap without distortion at narrow widths.
 *
 * The AWS Activate mark is behind `features.awsActivateBadge` in `lib/site.ts`.
 * It is off until the official artwork is supplied at the path below; turning
 * the flag on also adds the AWS Activate logo to the footer trademark notice.
 */
export function ProgramBadges({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-10 gap-y-5", className)}>
      <li className="flex items-center">
        <NvidiaInceptionBadge className="h-8 w-auto max-w-full lg:h-10" />
      </li>
      {features.awsActivateBadge ? (
        <li className="flex items-center">
          <Image
            src="/images/aws-activate-badge.png"
            alt="AWS Activate member"
            width={500}
            height={216}
            unoptimized
            className="h-8 w-auto max-w-full lg:h-10"
          />
        </li>
      ) : null}
    </ul>
  );
}
