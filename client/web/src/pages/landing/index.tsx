

import ProjectDetails from "./component/project-details";
import FullArchitechture from "./component/architechture";
import HeroSection from "./component/hero-section";
import Button from "../../components/Button";
import LandingNavigationBar from "./component/navbar";

function LandingPage(){
    
    return (
        <div className="w-screen bg-[#151918] flex flex-col min-h-screen text-[#948D83]">

            <LandingNavigationBar/>

            <HeroSection/>

            <hr></hr>
            <ProjectDetails/>
            <FullArchitechture/>
            <hr></hr>
            
            <section className="w-full min-h-screen justify-center items-center flex flex-col gap-4">
                <div className="flex flex-col rounded-md w-160 justify-center items-start gap-4 bg-[#212624] border border-[#948D83] p-4">
                    <h1> provide feedback!</h1>
                    <p> if you have anything you want to point out, please do leave feedback. it will greatly help me become better at my craft.</p>
                    <textarea className="bg-[#151918] w-full rounded-md border-#948D83" />
                    <Button>
                        submit
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default LandingPage