import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    state?: 'error' | 'default';
}

function TextInput({ icon: Icon, state = 'default', ...props }: TextInputProps) {
    const isError = state === 'error';

    // Dynamic border and focus ring classes based on state
    const containerStyles = isError
        ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
        : 'border-gray-700 focus-within:ring-2 focus-within:ring-white';

    return (
        <div className={`relative flex items-center w-full bg-[#202524] border rounded-lg transition ${containerStyles}`}>
            {Icon && (
                <div className="absolute left-3 text-gray-400 pointer-events-none flex items-center">
                    <Icon className="w-5 h-5" />
                </div>
            )}

            <input 
                {...props} 
                className={`w-full py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none ${
                    Icon ? 'pl-10 pr-4' : 'px-4'
                }`} 
            />
        </div>
    );
}

export default TextInput