import Link from "next/link"

export default function Header() {
    const printPage = () => {
        window.print();
    }
    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href="/">

                        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M62 60H4v-8h4a2 2 0 0 0 0-4H4v-6a2 2 0 0 0 0-4v-6h4a2 2 0 0 0 0-4H4v-6a2 2 0 0 0 0-4v-6h4a2 2 0 0 0 0-4H4V2a2 2 0 0 0-4 0v58c0 2.206 1.794 4 4 4h58a2 2 0 0 0 0-4z" /><path d="M56 34a2 2 0 0 0 2-2V22c0-.131-.014-.263-.039-.392-.013-.06-.035-.115-.052-.173-.02-.067-.035-.135-.062-.2-.029-.068-.068-.131-.104-.195-.027-.05-.049-.102-.08-.148a2.03 2.03 0 0 0-.556-.556c-.047-.031-.099-.053-.148-.08-.064-.035-.127-.074-.195-.104-.065-.026-.133-.042-.2-.062-.058-.017-.113-.039-.173-.052A2.132 2.132 0 0 0 56 20H46a2 2 0 0 0 0 4h5.172L32 43.172l-4.586-4.586a2 2 0 0 0-2.828 0l-10 10a2 2 0 1 0 2.828 2.828L26 42.828l4.586 4.586a2 2 0 0 0 2.828 0L54 26.828V32a2 2 0 0 0 2 2z" />

                            </svg>
                            <span className="ml-3 text-xl">Band Chart for beginner</span>
                        </div>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {/* <a className="mr-5 hover:text-gray-900">First Link</a>
                        <a className="mr-5 hover:text-gray-900">Second Link</a>
                        <a className="mr-5 hover:text-gray-900">Third Link</a> */}
                        <a onClick={printPage} className="mr-5 hover:text-gray-900">print</a>
                    </nav>
                    {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> */}
                </div>
            </header>
        </>
    )
}