import { useState, type ButtonHTMLAttributes, type ElementType, type ReactNode } from "react";
import {
  Search,
  UserCircle2,
  User,
  Bell,
  Lock,
  Star,
  Ban,
  EyeOff,
  Filter,
  AtSign,
  MessageCircle,
  Repeat2,
} from "lucide-react";
import useSearch from "../../../../hooks/useSearch/hook";
import { useNavigate } from "react-router-dom";

interface SectionItem {
  icon: ElementType;
  text: string;
  description?: string;
  route?: string;
  status?: boolean;
}

interface Section {
  label: string;
  items: SectionItem[];
}

const sections: Section[] = [
    {
        label: "Your Account",
        items: [
            { 
                icon: UserCircle2, 
                text: "Edit profile", 
                description: "Password, security, personal details, connected experiences, ad preferences", 
                route: "/accounts/profile", 
                status: true 
            }
        ],
    },
    {
        label: "How you use Social media clone (wink-wink)",
        items: [
            { icon: User, text: "Edit profile", route: "/accounts/profile", status: false },
            { icon: Bell, text: "Notifications", route: "/accounts/notifications", status: true },
        ],
    },
    {
        label: "Who can see your content",
        items: [
            { icon: Lock, text: "Account privacy", status: true },
            { icon: Star, text: "Close Friends", status: true },
            { icon: Ban, text: "Blocked", status: true },
            { icon: EyeOff, text: "Story and location", status: true },
        ],
    },
    {
        label: "How others can interact with you",
        items: [
            { icon: Filter, text: "Messages and story replies", status: true },
            { icon: AtSign, text: "Tags and mentions", status: true },
            { icon: MessageCircle, text: "Comments", status: true },
            { icon: Repeat2, text: "Sharing", status: true },
        ],
    },
];

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  sectionItem: SectionItem;
  className?: string;
  active: string
}

function Button({ active, sectionItem, className = "", ...props }: ButtonProps) {
    const Icon = sectionItem.icon;
  return (
    <button
      {...props}
      disabled={sectionItem.status}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] transition-colors ${
        sectionItem.status 
          ? "opacity-50 cursor-not-allowed" 
          : active === sectionItem.text 
          ? "bg-neutral-800" 
          : "hover:bg-neutral-900"
      } ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0 text-neutral-400" />}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-neutral-200 font-medium">{sectionItem.text}</span>
        {sectionItem.description && (
          <span className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{sectionItem.description}</span>
        )}
      </div>
    </button>
  );
}

export default function SettingsSidebar() {
  const [active, setActive] = useState<string>("Edit profile");
  const { search, handleSearch } = useSearch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-sm text-white px-5 py-6">
        <h1 className="text-2xl font-semibold mb-5">Settings</h1>

        {/* Search */}
        <div className="flex items-center gap-2 bg-neutral-900 rounded-full px-4 py-2.5 mb-6">
          <Search size={18} className="text-neutral-400 shrink-0" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="bg-transparent outline-none text-sm placeholder-neutral-400 w-full"
          />
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.label} className="mt-6">
            <div className="px-1 mb-2 text-sm text-neutral-400">
              {section.label}
            </div>
            <div className="space-y-0.5">
              
                {section.items.map((item)=>(
                    <Button sectionItem={item} active={active} onClick={()=> setActive(item.text)}/>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}