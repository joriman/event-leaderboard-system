import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import supabase from "../../server/supabaseClient"

// eslint-disable-next-line react/prop-types
export default function WorkoutsModal({participant_id}) {

  let [isOpen, setIsOpen] = useState(false)
  const [timeMins, setTimeMins] = useState(0)
  const [timeSecs, setTimeSecs] = useState(0)
  const [rank, setRank] = useState(0)
  const [formError, setFormError] = useState(0);

  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!timeMins || !timeSecs || !rank) {
      setFormError("Fill in all fields")
      return
    }

    const { data, error } = await supabase
      .from('workouts')
      .insert([{ timeMins, timeSecs, rank, participant_id}])

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }

    if (data) {
      console.log(data)
      setFormError(null)
    }
    closeModal()
    navigate('/')
    navigate(0)
  }

  return (
    <>
      <div className="flex items-center p-4">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-gray-600 bg-opacity-90 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Workout Data
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900 pb-4"
                  >
                    Add a Participant
                  </Dialog.Title>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label
                      htmlFor="timeMIns"
                      className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                      Minutes:
                    </label>
                    <input
                      type="number"
                      id="timeMins"
                      value={timeMins}
                      onChange={(e) => setTimeMins(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                        
                    <label
                      htmlFor="seconds"
                      className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                      Seconds:
                    </label>
                    <input
                      type="number"
                      id="eventName"
                      value={timeSecs}
                      onChange={(e) => setTimeSecs(e.target.value)}
                      className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />

                    <label
                      htmlFor="seconds"
                      className="block text-md font-medium text-gray-900 dark:text-white"
                    >
                      Seconds:
                    </label>
                    <input
                      type="number"
                      id="rank"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />

                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Got it, thanks!
                    </button>
                    {formError && <p className="bg-red-700 text-white font-semibold rounded-lg flex justify-center">{formError}</p>}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
