import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { CONTACT_DATA } from "@/constants/contact";
import { SITE_NAME } from "@/constants/site";
import { SOCIALS_DATA } from "@/constants/social";
import { SERVICES_DATA } from "@/constants/services";

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
    </svg>
  );
}

function InstagramIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function WhatsAppIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.981C16.578 1.895 14.103.872 11.474.872c-5.441 0-9.865 4.422-9.868 9.866-.001 1.802.489 3.562 1.418 5.116l-.995 3.637 3.733-.979zm11.233-7.558c-.305-.153-1.805-.89-2.083-.99-.278-.102-.48-.153-.682.153-.201.304-.778 1.012-.953 1.214-.176.203-.351.229-.656.077-.305-.152-1.288-.475-2.454-1.516-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.137.305-.355.457-.532.152-.178.203-.305.305-.51.101-.203.05-.381-.025-.533-.076-.152-.682-1.644-.934-2.253-.245-.595-.494-.514-.682-.524-.175-.01-.376-.011-.577-.011-.202 0-.531.076-.809.381-.278.305-1.062 1.039-1.062 2.535 0 1.497 1.088 2.943 1.24 3.146.152.203 2.142 3.272 5.19 4.588.724.313 1.29.5 1.73.64.729.23 1.391.198 1.916.12.584-.087 1.805-.738 2.058-1.453.253-.715.253-1.327.177-1.453-.076-.127-.278-.203-.583-.356z"/>
    </svg>
  );
}

const FOOTER_SOCIAL_ICONS: Record<string, React.ComponentType<React.ComponentProps<"svg">>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  whatsapp: WhatsAppIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryOffice = CONTACT_DATA.offices.find(o => o.active) || CONTACT_DATA.offices[0];

  return (
    <footer className="bg-[#1F1A16] text-[#FCFAF5] border-t border-border/5">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Column 1: Logo & Branding */}
          <div className="space-y-8 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block">
              {/* Force white/light-ivory color custom property for logo in dark footer */}
              <Logo className="[--logo-primary:#FCFAF5] h-11 w-auto text-[#FCFAF5]" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Serving pilgrims since 1986 with trust, transparency, and dedicated personal care.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS_DATA.filter(s => s.active).map(({ label, url, platform }) => {
                const Icon = FOOTER_SOCIAL_ICONS[platform];
                if (!Icon) return null;

                return (
                  <Link
                    key={label}
                    href={url}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-md border border-primary-foreground/15 text-primary-foreground/75 transition-all duration-200 hover:border-primary-foreground/30 hover:bg-primary-foreground/5 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-heading text-xs font-semibold tracking-widest text-primary-foreground/55 uppercase">
              Our Services
            </h3>
            <ul role="list" className="space-y-3.5">
              {SERVICES_DATA.filter(s => s.active).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30 rounded-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="font-heading text-xs font-semibold tracking-widest text-primary-foreground/55 uppercase">
              Quick Links
            </h3>
            <ul role="list" className="space-y-3.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Packages", href: "/tours" },
                { label: "Gallery", href: "/gallery" },
                { label: "Travel Guide", href: "/contact" },
                { label: "FAQs", href: "/contact#faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-4">
            <h3 className="font-heading text-xs font-semibold tracking-widest text-primary-foreground/55 uppercase">
              Contact Us
            </h3>
            <ul role="list" className="space-y-4">
              {primaryOffice && (
                <li className="flex items-start gap-3.5 text-sm text-primary-foreground/70">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-[#FAF9F6]/50"
                    aria-hidden="true"
                  />
                  <address className="not-italic leading-relaxed">{primaryOffice.address}</address>
                </li>
              )}
              <li className="flex items-start gap-3.5 text-sm text-primary-foreground/70">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-[#FAF9F6]/50"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${CONTACT_DATA.primaryPhone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30 rounded-sm"
                >
                  {CONTACT_DATA.primaryPhone}
                </a>
              </li>
              <li className="flex items-start gap-3.5 text-sm text-primary-foreground/70">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-[#FAF9F6]/50"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${CONTACT_DATA.primaryEmail}`}
                  className="transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30 rounded-sm"
                >
                  {CONTACT_DATA.primaryEmail}
                </a>
              </li>
              {primaryOffice?.workingHours && (
                <li className="flex items-start gap-3.5 text-sm text-primary-foreground/70">
                  <Clock
                    className="mt-0.5 size-4 shrink-0 text-[#FAF9F6]/50"
                    aria-hidden="true"
                  />
                  <span>{primaryOffice.workingHours}</span>
                </li>
              )}
            </ul>
          </div>

        </div>
      </Container>

      {/* Copyright Footer Bottom Bar */}
      <div className="border-t border-border/5 bg-[#1F1A16]/50 py-8">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} {SITE_NAME}. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-primary-foreground/50">
            <Link href="/contact" className="hover:text-primary-foreground/80 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-primary-foreground/80 transition-colors">Terms & Conditions</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
