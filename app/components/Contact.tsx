export const Contact = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Contact Me</h2>
      <h3>
        Feel free to contact me with any questions or concerns. <br /> I
        appreciate your interest and look forward to hearing from you!
      </h3>
      <form className="flex flex-col w-full max-w-md">
        <label className="mb-2 font-semibold" htmlFor="name">
          Name:
        </label>
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="text"
          id="name"
          name="name"
          required
        />
        <label className="mb-2 font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          className="mb-4 p-2 border border-gray-300 rounded"
          type="email"
          id="email"
          name="email"
          required
        />
        <label className="mb-2 font-semibold  " htmlFor="message">
          Message:
        </label>
        <textarea
          className="mb-4 p-2 border border-gray-300 rounded"
          id="message"
          name="message"
          rows={5}
          required
        ></textarea>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};
