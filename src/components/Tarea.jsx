import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import useAuth from "../hooks/useAuth"

const Tarea = ({tarea}) => {

    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()

    const admin = useAdmin()

    console.log(admin);

    const {nombre, descripcion, fechaEntrega, prioridad, estado, _id, encargado, idEncargado} = tarea

    const {auth} = useAuth()
    const compruebaUsuario = auth._id === idEncargado

    return (
        (admin || compruebaUsuario || idEncargado==="") ? (
            <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-start">
                    <p className="mb-1 text-xl">{nombre}</p>
                    <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                    {idEncargado && <p className="mb-1 bg-sky-600 text-white p-1 rounded-lg text-sm uppercase">Encargado de la Tarea: <span className="font-semibold">{encargado}</span></p>}
                    <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
                    <p className={`mb-1 ${prioridad === 'Baja' ? 'text-green-500' : prioridad === 'Media' ? 'text-yellow-500' : prioridad === 'Alta' ? 'text-red-500' : ''}`}>Prioridad: {prioridad}</p>
                    {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
                </div>

                <div className="flex flex-col lg:flex-row mt-4 md:mt-0 gap-2">
                    {admin && !estado && (
                        <button
                            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleModalEditarTarea(tarea)}
                        >Editar</button>
                    )}

                    <button
                        className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                        onClick={() => completarTarea(_id)}
                    >{estado ? "Completa" : "Incompleta"}</button>
                    
                    {admin && !estado && (
                        <button
                            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleModalEliminarTarea(tarea)}
                        >Eliminar</button>
                    )}
                </div>
            </div>
        ) : (
            <div className='border-b'>
                <p className='text-center p-10'>No tienes disponible la tarea: {nombre}</p>
            </div>
        )
    )
}

export default Tarea
