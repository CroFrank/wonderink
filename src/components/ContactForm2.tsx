import { useRef, useState } from "react"
import { toast } from "sonner"

const ContactForm2 = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const validMimeTypes = ["image/jpeg", "image/png"]

  const sendFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!formRef.current) {
      console.log("something wrong with form ref")
      setLoading(false)
      return
    }

    const formData = new FormData(formRef.current)
    const files = [
      ...(formData.getAll("pozicija-slike") as File[]),
      ...(formData.getAll("primjeri-slike") as File[]),
    ]
    const invalidFiles = files.filter(
      (file) => !validMimeTypes.includes(file.type)
    )

    if (invalidFiles.length > 0) {
      toast("Nedozvoljen format slike!", {
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      })
      setLoading(false)
      return
    }

    const totalSizeMB =
      files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)
    if (totalSizeMB > 10) {
      toast("Ukupna veličina slika prelazi 10MB!", {
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      })
      setLoading(false)
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
        toast("Error! Pokušajte ponovno kasnije.", {
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
        })
      } else {
        toast("Hvala! Javit ćemo se ubrzo.", {
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
        })
      }
    } catch (error) {
      toast("Error! Pokušajte ponovno kasnije.", {
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      })
    } finally {
      formRef.current.reset()
      setLoading(false)
    }
  }

  return (
    <div className="neon-box-blue p-8 rounded-lg shadow-lg bg-black">
      <h3 className="text-2xl font-bold text-center mb-20">TATTOO FORMULAR</h3>
      <form ref={formRef} onSubmit={sendFormData}>
        <h4 className="text-xl font-medium mb-8">Osobni podaci</h4>
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
        <h3 className="text-xl font-medium mb-8 mt-20">Tattoo informacije</h3>
        <input
          type="text"
          name="velicina"
          placeholder="Veličina tetovaže (cm)"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
          required
        />
        <textarea
          name="opis"
          rows={3}
          placeholder="Opis tetovaže"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded mt-4"
          required
        ></textarea>
        <input
          type="text"
          name="pozicija"
          placeholder="Pozicija na tijelu"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded mt-4"
          required
        />
        <input
          type="file"
          name="pozicija-slike"
          multiple
          accept="image/*"
          className="w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded mt-4"
          required
        />
        <p className="pt-2 text-gray-100 text-sm">
          potrebno je učitati fotografiju vašeg dijela tijela kojeg želite
          tetovirati
        </p>

        <input
          type="file"
          name="primjeri-slike"
          multiple
          accept="image/*"
          className="w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded mt-4"
          required
        />
        <p className="pt-2 text-gray-100 text-sm">
          učitajte primjere tetovaža koje vam se sviđaju{" "}
        </p>
        <p className="pt-4 text-gray-400 text-sm">
          ukupno max. 10MB, formati JPG i PNG{" "}
        </p>
        <div className="mt-6 flex items-start">
          <input
            type="checkbox"
            name="privatnost"
            className="mr-2 w-5 h-5 bg-gray-700 border-gray-600 rounded"
            required
          />
          <label className="text-gray-300">
            Slažem se s{" "}
            <a href="/politika-privatnosti" className="text-red-500 underline">
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
  )
}
export default ContactForm2
