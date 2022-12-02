'use client';
import { collection, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { uploadBytesResumable, ref } from 'firebase/storage';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { doc, getDoc, db, storage } from '../components/firebase';



function NewRequestFlow() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = data => {
    setIsUploading(true);
    const requestsRef = collection(db, 'requests');

    console.log(data);
    let data_temp = structuredClone(data);
    data_temp["attachment"] = "none";
    data_temp["inProgress"] = true;

    console.log(data_temp);

    addDoc(requestsRef, data_temp).then(e => {
      // do the whole file upload and then reload the page
      const storageRef = ref(storage, `/files/${data["attachment"][0].name}`);
      console.log(data["attachment"][0]);
      const uploadTask = uploadBytesResumable(storageRef, data["attachment"][0]);

      uploadTask.on("state_changed", snapshot => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (percent == 100) {
          location.reload();
        }
      });
    });
  };

  const platform_checks = [
    ["Facebook", "facebook"],
    ["Instagram", "instagram"],
    ["Twitter", "twitter"],
    ["LinkedIn", "linkedin"],
    ["Youtube", "youtube"],
    ["Print & Other", "other"]
  ];

  const software_checks = [
    "Photoshop",
    "SomeOther",
    "InDesign",
    "Canva",
    "Premire",
    "After Effects"
  ];

  function CheckGroupItem({ text, datapath }) {
    return (
      <div className="ml-4 inline">
        <label>
          {text}
          <input className="ml-2 pr-4 bg-gray-200" type="checkbox" {...register(datapath)} />
        </label>
      </div>
    );
  }

  function LoadingProgress() {
    return (
      <div>
        Uploading Content...
      </div>
    );
  }

  function TheForm() {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="">
          <br /><div className="font-bold">Task Name</div>
          <input className="bg-gray-200 px-2 py1 mb-4 w-full"
            {...register("taskName")} /><br />
        </label>

        <label>
          <div className="font-bold">Platform</div>
          {platform_checks.map(obj => {
            return (
              <CheckGroupItem text={obj[0]} datapath={"platform." + obj[1]} />
            );
          })}
        </label>

        <label className="">
          <br /><div className="font-bold mt-4">Size (Width & Height)</div>
          <input className="bg-gray-200 px-2 py1 mb-4 w-full"
            {...register("contentSize")} /><br />
        </label>

        <label>
          Graphic Task
          <input className="ml-2" type="checkbox" {...register("taskType.graphicTask")} />
        </label>
        <div className="ml-4 inline">
          <label>
            Video Task
            <input className="ml-2 pr-4" type="checkbox" {...register("taskType.videoTask")} />
          </label>
        </div>

        <label>
          <div className="font-bold mt-4">Software</div>
          {software_checks.map(obj => {
            return (
              <CheckGroupItem text={obj} datapath={"software." + obj.toLowerCase()} />
            );
          })}
        </label>


        <label className="">
          <div className="font-bold mt-4">Image Copy</div>
          <input className="bg-gray-200 px-2 py1 w-full"
            {...register("imageCopy")} /><br />
        </label>

        <label className="">
          <div className="font-bold mt-4">Design Brief</div>
          {//<input className="bg-gray-200 text-left top-0 py1 mb-4 w-full h-32" type="text"
            //{...register("brief")} /><br />
          }
          <textarea className="bg-gray-200 w-full h-32"
            {...register("brief")} />
        </label>

        <label>
          <div className="font-bold mt-4">Attachments</div>
          <input type="file"
            {...register("attachment")} />
        </label>


        { // <input {...register("exampleRequired", { required: true })} />
          // {/* errors will return when field validation fails  */}
          // {errors.exampleRequired && <span>This field is required</span>} 
        }


        <div className="w-full flex flex-row justify-end mt-4">
          <div className="inline">
            <label className="m-4 bg-octo-dark-purple text-octo-yellow px-4 rounded-lg font-bold cursor-pointer">
              Submit Request & Connect With A Project Manager
              <input type="submit" value="" />

            </label>

          </div>

        </div>

      </form>
    );
  }

  return (
    <div className="p-4 bg-white m-10 rounded-lg ">
      {isUploading ? <LoadingProgress /> : <TheForm />}
    </div>
  );
}

function ProjectTable() {
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState(false);

  if (!docs) {
    getDocs(collection(db, 'requests')).then(qs => {
      let temp_docs_arr = [];
      qs.forEach(doc => {
        temp_docs_arr.push(doc.data());
      });
      setDocs(temp_docs_arr);
      setLoading(false);
    });
  }

  function TableItem({ task, status, dueOn }) {
    let color = (status == "In Progress") ? "text-orange-700" : "text-green-500";

    return (
      <tr className="bg-gray-200 ml-2">
        <td><div className="ml-2">{task}</div></td>
        <td><div className={color}>{status}</div></td>
        <td>{dueOn}</td>
      </tr>
    );
  }

  function RequestsTable() {

    let row_arr = docs.map(doc => {
      let progress_text = doc["inProgress"] ? "In Progress" : "Complete";

      let elem = <TableItem task={doc["taskName"]} status={progress_text} dueOn="2022/12/12" />;

      return elem;
    });


    return (
      <table className="table-auto w-full border-separate border-spacing-y-3">
        <colgroup>
          <col className="w-2/4" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <thead>
          <tr className="text-left">
            <th>Task</th>
            <th>Status</th>
            <th>Due on</th>
          </tr>
        </thead>

        <tbody>
          {row_arr}
        </tbody>

      </table>
    );
  }

  function LoadingIndicator() {
    return (
      <div>
        Loading....
      </div>
    );
  }


  return (
    <div className="p-4 bg-white m-10 rounded-lg ">
      <div className="">Active Graphic Design Requests</div>
      {loading ? <LoadingIndicator /> : <RequestsTable />}
    </div>
  );
}

export default function Home() {

  const [addNew, setAddNew] = useState(false);

  // const docRef = doc(db, "cities", "SF");
  // getDoc(docRef).then(ds => console.log(ds.data()));

  return (
    <div className="w-full bg-octo-yellow rounded-lg pb-10">
      {// <div className="w-full border border-red-700 m-10 inline-block">
        //   lol
        // </div>
      }
      <div onClick={() => { setAddNew(true) }}
        className="cursor-pointer bg-octo-dark-purple text-octo-yellow rounded-full p-4 py-1 inline-block ml-10 mt-4">
        New Request
      </div>
      {addNew ? <NewRequestFlow /> : <ProjectTable />}
    </div>
  );
}
