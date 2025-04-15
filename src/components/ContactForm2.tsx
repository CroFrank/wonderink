import { useRef, useState } from "react"

const ContactForm2 = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const validMimeTypes = ["image/jpeg", "image/png"]

  const sendFormData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!formRef.current) {
      console.log("something wrong with form ref")
      setLoading(false)
      return
    }

    const formData = new FormData(formRef.current)

    const files = formData.getAll("slike") as File[]
    const invalidFiles = files.filter(
      (file) => !validMimeTypes.includes(file.type)
    )

    if (invalidFiles.length > 0) {
      console.warn("Invalid file type detected")
      setFailure(true)
      setLoading(false)
      setTimeout(() => setFailure(false), 4000)
      return
    }

    try {
      const response = await fetch("https://formcarry.com/s/12c5Xn7v5_N", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        setFailure(true)
        setTimeout(() => {
          setFailure(false)
        }, 4000)
      } else {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000)
      }
    } catch (error) {
      setFailure(true)
      setTimeout(() => {
        setFailure(false)
      }, 4000)
    } finally {
      formRef.current.reset()
      setLoading(false)
    }
  }

  return (
    <>
      <div className="neon-box-blue p-8 rounded-lg shadow-lg bg-black">
        <h2 className="text-3xl font-bold text-center mb-20">Tattoo Forma</h2>
        <form ref={formRef} onSubmit={sendFormData}>
          <h3 className="text-xl font-semibold mb-8">Osobni podaci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="ime"
              placeholder="Ime"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="prezime"
              placeholder="Prezime"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>

          <input type="hidden" name="_gotcha" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="number"
              name="godine"
              placeholder="Godine"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>

          <input
            type="tel"
            name="mob"
            placeholder="Mobitel"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded mt-4"
            required
          />

          <h3 className="text-xl font-semibold mb-8 mt-20">
            Tattoo informacije
          </h3>
          <input
            type="text"
            name="nazivTetovaze"
            placeholder="Naziv tetovaže"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="velicina"
              placeholder="Veličina tetovaže (cm)"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
            <input
              type="text"
              name="pozicija"
              placeholder="Pozicija na tijelu"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>

          <textarea
            name="opis"
            rows={3}
            placeholder="Opis tetovaže"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded mt-4"
            required
          ></textarea>

          <div className="mt-6 mb-16">
            <label className="block text-gray-300 mb-5">Slike</label>
            <input
              type="file"
              name="slike"
              multiple
              accept="image/*"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
            <p className="pt-2 text-gray-100 text-sm">
              max. 10MB veličina slike, formati JPG i PNG{" "}
            </p>
          </div>

          <div className="mt-6 flex items-start">
            <input
              type="checkbox"
              name="privatnost"
              className="mr-2 w-5 h-5 bg-gray-700 border-gray-600 rounded"
              required
            />
            <label className="text-gray-300">
              Slažem se s{" "}
              <a
                href="/politika-privatnosti"
                className="text-red-500 underline"
              >
                politikom privatnosti
              </a>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full mt-6 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Slanje..." : "Pošalji"}
          </button>
        </form>
      </div>

      {/* Toast notifications */}

      <div
        id="toast-success"
        className={`fixed top-5 right-5 ${
          success ? "flex" : "hidden"
        } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Poruka uspješno poslana.</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="toast-danger"
        className={`fixed top-5 right-5 ${
          failure ? "flex" : "hidden"
        } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"></path>
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Greška prilikom slanja.</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            ></path>
          </svg>
        </button>
      </div>
      <div
        id="toast-warning"
        className="fixed top-5 right-5 hidden items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 "
        role="alert"
      >
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"></path>
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          Improve password difficulty.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            ></path>
          </svg>
        </button>
      </div>
    </>
  )
}
export default ContactForm2
