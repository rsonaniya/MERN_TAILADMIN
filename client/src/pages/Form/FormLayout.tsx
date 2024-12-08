import { useState } from 'react';

const FormLayout = () => {
  const [category, setCategory] = useState<string>('');
  const url = import.meta.env.VITE_API_URL;

  const handleAddCategory = async () => {
    if (!category) return alert('category is required');
    const body = JSON.stringify({ category });

    try {
      const res = await fetch(`${url}/api/master`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!res.ok) throw new Error();
    } catch (error) {
      alert('Could not add category');
    }
    setCategory('');
    alert('Category Added Successfully');
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Category</h3>
      </div>
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={handleAddCategory}
            disabled={!category}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLayout;
