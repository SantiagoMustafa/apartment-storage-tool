import { useNavigate } from "react-router-dom";
import useUserContext from "../core/hooks/useUserContext";
import { useEffect, useState } from "react";
import LinkIcon from "./components/linkIcon";
import Input from "../auth/components/input";

import deleteIcon from "../assets/delete-icon.svg";
import addIcon from "../assets/add-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import closeIcon from "../assets/close-icon.svg";

export default function Home() {
  // states
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  //  context
  const { user } = useUserContext();

  // redirects
  const redirect = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/department/${user.uuid}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      redirect("/auth/login");
    }

    const openModal = document.getElementById("openModal");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelectorAll(".closeModal");

    openModal.addEventListener("click", () => {
      modal.showModal();
    });

    closeModal.forEach((item) => {
      item.addEventListener("click", () => {
        modal.close();
      });
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modal.close();
      }
    });
  }, []);

  // Handles
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newData = {
      title: formData.get("title"),
      description: formData.get("description"),
      address_street: formData.get("address_street"),
      address_number: formData.get("address_number"),
      rent: formData.get("rent"),
      expenses: formData.get("expenses"),
      rooms: formData.get("rooms"),
      environments: formData.get("environments"),
      link: formData.get("link"),
      user_uuid: user.uuid,
    };

    fetch("http://localhost:3000/department/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(...data, newData);
        setData([...data, newData]);
      })
      .catch((error) => console.log(error));

    document.querySelector("form").reset();
  };

  return (
    <>
      <section className="my-12">
        <h2 className="text-center text-2xl font-bold">
          Tu lista de departamentos
        </h2>
      </section>
      <section className="my-auto grid h-full w-full gap-4">
        <header className="grid gap-2">
          <h3 className="text-left text-3xl font-bold">
            Tabla de departamentos
          </h3>
          <section className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                id="openModal"
                title="Agregar nuevo departamento"
                aria-label="Nuevo departamento"
              >
                <img
                  src={addIcon}
                  alt="Agregar departamento"
                  width={25}
                  height={25}
                />
              </button>
              <button>
                <img
                  src={editIcon}
                  alt="Editar departamento"
                  width={25}
                  height={25}
                />
              </button>
              <button>
                <img
                  src={deleteIcon}
                  alt="Eliminar departamento"
                  width={25}
                  height={25}
                />
              </button>
            </div>
            <div>
              <input
                type="text"
                name="filter"
                value={filter}
                onChange={handleFilter}
                placeholder="Filtrar por Barrio"
                className="w-full rounded-md px-2 py-2 text-lg font-semibold"
              />
            </div>
          </section>
        </header>
        {data && (
          <table aria-label="Tabla de departamentos">
            <thead aria-label="Cabecera de la tabla">
              <tr>
                <th>Barrio</th>
                <th>Dirección</th>
                <th>Alquiler</th>
                <th>Expensas</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody
              className="border text-center"
              aria-label="Lista de departamentos"
            >
              {data.map((item) => {
                if ((filter && item.title.includes(filter)) || !filter) {
                  return (
                    <tr key={item.id || item.link} className="border">
                      <td className="border text-center">{item.title}</td>
                      <td className="border text-center">
                        {item.address_street + ", " + item.address_number}
                      </td>
                      <td className="border text-center">{item.rent}</td>
                      <td className="border text-center">{item.expenses}</td>
                      <td className="border text-center">
                        <a
                          target="_blank"
                          href={item.link}
                          className="flex items-center justify-center"
                        >
                          <LinkIcon />
                        </a>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </section>
      <dialog
        id="modal"
        className="fixed mx-auto my-auto w-full max-w-xl rounded-md border border-gray-200 backdrop:backdrop-blur-sm"
      >
        <div className="relative w-full p-4">
          <button autoFocus className="closeModal absolute right-4 top-4">
            <img src={closeIcon} alt="Botón de Cerrar" width={30} height={30} />
          </button>
          <form className="my-10 grid w-full gap-4 p-4" onSubmit={handleSubmit}>
            <Input label="Título" type="text" name="title" required />
            <Input
              label="Descripción"
              type="text"
              name="description"
              required
            />
            <Input label="Alquiler" type="text" name="rent" required />
            <Input label="Expensas" type="text" name="expenses" required />
            <Input
              label="Dirección"
              type="text"
              name="address_street"
              required
            />
            <Input label="Número" type="text" name="address_number" required />
            <Input label={"Habitaciones"} type="text" name="rooms" required />
            <Input
              label={"Ambientes"}
              type="text"
              name="environments"
              required
            />
            <Input label="Link" type="text" name="link" required />
            <button
              autoFocus
              className="closeModal w-full rounded-md border bg-stone-700 p-2 text-lg font-bold text-white"
            >
              Guardar
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
