function FullArchitechture(){
    return (
        <section className="w-full min-h-screen px-12 py-8 flex flex-col gap-4">
            <h1 className="flex w-full justify-center"> Architechture </h1>
        
            <h3> why react + typescript? </h3>
            <p> for <b className="text-cyan-400">react</b> it is industry standard meaning, there is no shortage of people to be able to maintain it and scalability, there is a little trade-off of performance on the client-side but with its diverse ecosystem of packages, the trade-off is justified as it meets in between the performance-scalability golden ratio for projects like these. </p>
            <p> as for <b className="text-blue-400">typescript</b>, it transforms the normal javascript into a type-safe language, it also helps alot in maintainability as types define what data is meant to be sent/recieved rather than relying on destructuring data yourself. features that manipulate how data should be managed like ReadOnly helps developers make less mistakes and provide better product quality by eliminating early-maintainance problems.</p>
            <h3> why springboot + java? </h3>
            <p> to be honest, <b className="text-pink-400">instagram</b>, was built with <b className="text-green-300">django</b> and is still being written in django. so then why springboot and java? java has the perfect balance of performance and complexity, it is after all, a hybrid language that is compiled and interpreted. under the project constraints it is perfectly viable. while django may have faster development onboarding, springboot only lags behind shortly but also consider that springboot also provides excellent developer onboarding too, packages like <u className="text-green-500">lombok</u> and <u className="text-green-500">jakarta-persistence-api</u> speed up development times. </p>
            <h3> why microservices over monolithic? </h3>
            <p> originally, backend servers start as a monolithic architechture to define project constraints and then work to be split as microservices as the project scales but for the sake of architechtural studies, I will initially start with a microservices architechture as I am under the assumption that the system needs the highest achievable uptime.</p>
        </section>
    )
}

export default FullArchitechture