import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface CategoriesRes {
  _id: string;
  category: string;
}

interface FormData {
  question: string;
  masterId: string;
}

const FormElements = () => {
  const [categories, setCategories] = useState<CategoriesRes[]>([]);
  const [formData, setFormData] = useState<FormData>({
    question: '',
    masterId: '',
  });
  const url = import.meta.env.VITE_API_URL;

  const handlePostQuestion = async () => {
    if (!formData.masterId || !formData.question)
      return alert('Question and Category is required');
    const body = JSON.stringify(formData);
    try {
      const res = await fetch(`${url}/api/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      if (!res.ok) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      alert('Could not post your question');
      return;
    }
    setFormData({
      question: '',
      masterId: '',
    });
    alert('Question Posted Successfully');
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${url}/api/master`);

        if (!res.ok) throw new Error('Could not fech categories');
        const cat = await res.json();
        setCategories(cat);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Add Question Form" />

      <div>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add A Question
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Please type your question here"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Select Category
                </label>
                <select
                  placeholder="Select Category"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  value={formData.masterId}
                  onChange={(e) =>
                    setFormData({ ...formData, masterId: e.target.value })
                  }
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={handlePostQuestion}
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
