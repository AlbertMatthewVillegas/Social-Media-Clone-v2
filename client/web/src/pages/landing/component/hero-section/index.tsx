import { FileText } from "lucide-react";
import GitHub from '../../../../assets/github.svg'
    function HeroSection() {
      return (<section className="w-full min-h-screen justify-center items-center flex flex-col gap-4">
                <h1> regExpress </h1>
                <p> social media clone </p>
                <div className="flex flex-row justify-center items-center gap-2">
                    <button className="flex flex-row gap-2 border px-4 py-2 rounded-xl cursor-pointer hover:border-white hover:text-white"> view documentation <FileText /></button>
                    <button className="flex flex-row gap-2 bg-[#1c1f23] border px-4 py-2 rounded-xl cursor-pointer hover:border-white hover:text-white"> view documentation <img src={GitHub} alt="github-icon" width={24} height={24} /></button>
                </div>
            </section>);
    }

export default HeroSection