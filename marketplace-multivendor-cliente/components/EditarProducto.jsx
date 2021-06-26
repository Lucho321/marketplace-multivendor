import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, Modal, Image, Tabs, Tab } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2'
import { guardarProducto, getImageByProducto, guardarImagenProducto, updateImagenProducto, deleteImagenProducto, getProductoById, updateProducto, getAllCategorias, agregarCategoria, agregarCategoriaProducto, getCategoriaByProductos, deleteCategoriaProducto } from '../services/productos.service'
import { ComunidadTienda } from './ComunidadTienda';


export const EditarProducto = ({productoId}) => {
    const [key, setKey] = useState('Producto');
    const [modalShow, setModalShow] = useState(false);
    const [ nombre, setNombre ] = useState('');
    const [ precioEnvio, setPrecioEnvio ] = useState('');
    const [ ubicacion, setUbicacion ] = useState('');
    const [ precio, setPrecio ] = useState('');
    const [ cantidad, setCantidad ] = useState('');
    const [ descripcion, setDescripcion ] = useState('');
    const [ tiempoEnvio, setTiempoEnvio ] = useState('');
    const [ usuarioId, setUsuarioId ] = useState();
    const [ _productoId, _setProductoId ] = useState(null);
    const [ imagenes, setImagenes ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState();
    const [ producto, setProducto ] = useState({});
    const [ categorias, setCategorias ] = useState();
    const [ categoriasSeleccionadas, setCategoriasSeleccionadas ] = useState([]);
    const [ categoriasNuevas, setCategoriasNuevas ] = useState([]);
    const [ categoriasViejas, setCategoriasViejas ] = useState([]);
    const [ categoriasEscogiendo, setCategoriasEscogiendo ] = useState([]);


    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
    
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const getCategorias = ()=>{
        getAllCategorias()
            .then(res=>{
                let cats = [];
                for(let i in res){
                    let ob = {
                        value: res[i].id_categoria,
                        label: res[i].nombre
                    };
                    cats.push(ob);
                };
                setCategorias(cats);
            })
    }

    const getCategoriasDelProducto = ()=>{
        getCategoriaByProductos(productoId)
            .then(res=>{
                let cats = [];
                for(let i in res){
                    let ob = {
                        value: res[i].id_categoria,
                        label: res[i].nombre
                    };
                    cats.push(ob);
                };
                setCategoriasViejas(cats);
                setCategoriasEscogiendo(cats);
            })
    }

    const handleChange = (newValue, actionMeta) => {
        if(newValue.length > 0 ){
            let cs = [];
            let cn = [];
            console.log(newValue);
            for(let i in newValue){
                let nuevo = true;
                for(let j in categorias){
                    if(newValue[i].value == categorias[j].value && newValue[i].label == categorias[j].label){
                        nuevo = false;
                    }
                }
                if(nuevo){
                    cn.push(newValue[i]);
                }else{
                    cs.push(newValue[i]);
                }
            }
            setCategoriasSeleccionadas(cs);
            setCategoriasNuevas(cn);
        }else{
            setCategoriasSeleccionadas([]);
            setCategoriasNuevas([]);
        }
        setCategoriasEscogiendo(newValue);
      };

    const uploadToServer = async (_name) => {
        const body = new FormData();
        body.append("file", image);
        body.append("_name", _name);
        const response = await fetch("/api/file", {
          method: "POST",
          body
        });
    };

    const getImages = async(pid)=>{
        getImageByProducto(pid).then(r=>{
            setImagenes(r);
        });
        
    }

    let usuarioLogeado;
    useEffect(() => {
        getProducto();
        getCategorias();
        getCategoriasDelProducto();
        getImages(productoId);
        if (typeof window !== 'undefined') {
            usuarioLogeado = JSON.parse(localStorage.getItem('_user'));
            if(usuarioLogeado != undefined){
                if(usuarioLogeado.nombre_usuario){
                    setUsuarioId(usuarioLogeado.id_tienda);
                    
                    _setProductoId(productoId);
                }
            }
        }
    }, [productoId])

    const validarAlgoCambio=()=>{
        if((validarCambioSelect() || nombre != producto.nombre_producto || parseInt(precioEnvio) != producto.costo_envio || ubicacion != producto.ubicacion || parseInt(precio) != producto.precio || parseInt(tiempoEnvio) != producto.tiempo_envio|| descripcion != producto.descripcion || parseInt(cantidad)!=producto.cantidad_disponible)&& categoriasEscogiendo.length>0){
            return true;
        }
        return false;
    };

   const validarAgregarImagen = ()=>{
       if(productoId != null){
           return false;
       }
       return true;
   }

   const validarCambioSelect = ()=>{

        let huboCambio = false;
        if(categoriasEscogiendo.length === categoriasViejas.length)
        {
            for(let i in categoriasEscogiendo){
                let borrar = true;
                for(let j in categoriasViejas){
                    if(categoriasEscogiendo[i].value == categoriasViejas[j].value && categoriasEscogiendo[i].label == categoriasViejas[j].label){
                        borrar = false;
                    }
                }
                if(borrar){
                    huboCambio=true;
                }
            }
        }else{
            return true;
        }
        return huboCambio;
        
   }


    const handleSaveProducto = (e)=>{

        let catBorrar = [];
        for(let i in categoriasViejas){
            let borrar = true;
            for(let j in categoriasSeleccionadas){
                if(categoriasViejas[i].value == categoriasSeleccionadas[j].value && categoriasViejas[i].label == categoriasSeleccionadas[j].label){
                    borrar = false;
                }
            }
            if(borrar){
                catBorrar.push(categoriasViejas[i]);
            }
        }

        let catAgregar = [];
        for(let i in categoriasSeleccionadas){
            let agregar = true;
            for(let j in categoriasViejas){
                if(categoriasSeleccionadas[i].value == categoriasViejas[j].value && categoriasSeleccionadas[i].label == categoriasViejas[j].label){
                    agregar = false;
                }
            }
            if(agregar){
                catAgregar.push(categoriasSeleccionadas[i]);
            }
        }

        if(catBorrar.length > 0){
            console.log(catBorrar)
        }

        if(catAgregar.length > 0){
            console.log(catAgregar)
        }

        if(categoriasNuevas.length > 0){
            console.log(categoriasNuevas)
        }
        

        e.preventDefault();

        let productoG = {
            id_producto: producto.id_producto,
            nombre_producto: nombre,
            descripcion: descripcion,
            cantidad_disponible: cantidad,
            ubicacion: ubicacion,
            precio: precio,
            tiempo_envio: tiempoEnvio,
            costo_envio: precioEnvio,
            id_tienda: usuarioId,
            calificacion: producto.calificacion,
            fecha_publicacion: producto.fecha_publicacion
        }

        updateProducto(productoG)
            .then(res=>{
                if(res==="Producto actualizada exitosamente."){
                    if(catAgregar.length>0){
                        for(let i in catAgregar){
                            agregarCategoriaProducto(catAgregar[i].value, producto.id_producto);
                        }
                    }
                    if(categoriasNuevas.length>0){
                        for(let i in categoriasNuevas){
                            agregarCategoria(categoriasNuevas[i].label, producto.id_producto);
                        }
                    }
                    if(catBorrar.length>0){
                        for(let i in catBorrar){
                            deleteCategoriaProducto(producto.id_producto, catBorrar[i].value);
                        }
                    }
                    getCategorias();
                    setTimeout(function(){
                        getCategoriasDelProducto();
                    }, 3000);
                    
                    setCategoriasSeleccionadas([]);
                    setCategoriasNuevas([]);
                    Swal.fire({
                        icon: 'success',
                        title: `Excelente`,
                        text: `Producto actualizado correctamente`,
                        showConfirmButton: false,
                        timer: 4000
                    });
                    getProducto();
                }
            });
    }

    const handleSaveImage = (e)=>{

        let img={
            nombre:"no-disponible.jpg",
            url_foto:"no-disponible.jpg",
            id_producto: productoId
        };
        guardarImagenProducto(img)
                .then(res=>{
                    if(res[0].id_foto > 0){
                        uploadToServer(`pro-${productoId}-ima-${res[0].id_foto}-${image.name}`).then(r=>{});
                        let img2 = {
                            ...img,
                            id_foto: res[0].id_foto
                        };
                        img2.url_foto= `pro-${productoId}-ima-${res[0].id_foto}-${image.name}`;
                        updateImagenProducto(img2).then(rex=>{
                            if(rex==="Foto actualizada exitosamente."){
                                Swal.fire({
                                    icon: 'success',
                                    title: `Excelente`,
                                    text: `Imagen agregada correctamente`,
                                    showConfirmButton: false,
                                    timer: 2500
                                });
                                setTimeout(function(){
                                    getImages(productoId);
                                }, 3000);
                                setModalShow(false);
                            }
                        });
                    }
                });
    }

    const getProducto = async()=>{
        getProductoById(productoId)
            .then(p=>{
                setProducto(p[0]);
                setNombre(p[0].nombre_producto);
                setPrecioEnvio(p[0].costo_envio);
                setUbicacion(p[0].ubicacion);
                setPrecio(p[0].precio);
                setCantidad(p[0].cantidad_disponible);
                setDescripcion(p[0].descripcion);
                setTiempoEnvio(p[0].tiempo_envio);
            });
    }

    const handleEliminarIma = (e, idFoto)=>{
        deleteImagenProducto(idFoto).then(res=>{
            if(res === "Foto eliminada exitosamente."){
                Swal.fire({
                    icon: 'success',
                    title: `Excelente`,
                    text: `Se ha eliminado esta foto del producto`,
                    showConfirmButton: false,
                    timer: 2500
                });
                getImages(productoId);
            }
        })
    }


    return (
        
            <Tabs
                className="pt-2"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                style={{color:"#212529!important"}}
            >
                <Tab eventKey="Producto" title="Datos del Producto">
                <Row className="pb-4 pl-4 pr-4 pt-1 mb-3">
                    <Col md={12}>
                        <Row className="pt-1 mb-2">
                            <Col>
                                
                            </Col>
                        </Row>
                        <Row >
                            <Col md={7} className="mb-3">
                                <Form onSubmit={handleSaveProducto}>
                                    <Row>
                                        <Col>
                                            <h5><small><strong>Datos del producto</strong></small></h5>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control name="nombre" value={ nombre } onChange={ (e)=>{setNombre(e.target.value);}} type="text" placeholder="Nombre del producto" />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pt-1">
                                            <div style={{marginBottom:"0.45rem!important"}}>Categorías</div>
                                            <CreatableSelect
                                                isMulti
                                                onChange={handleChange}
                                                options={categorias}
                                                value={categoriasEscogiendo}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <Form.Label>Precio del producto</Form.Label>
                                                <Form.Control name="pais" value={ precio } onChange={ (e)=>{setPrecio(e.target.value);}} type="text" placeholder="Precio en dólares" />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group >
                                                <Form.Label>Cantidad</Form.Label>
                                                <Form.Control name="pais" value={ cantidad } onChange={ (e)=>{setCantidad(e.target.value);}} type="text" placeholder="Cantidad productos disponibles" />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                    <Form.Label>Descripción</Form.Label>
                                                    <Form.Control name="direccion" value={ descripcion } onChange={ (e)=>{setDescripcion(e.target.value);}} type="text" placeholder="Descripción del producto" />
                                                    <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                    <Form.Label>Ubicación</Form.Label>
                                                    <Form.Control name="email" value={ ubicacion } onChange={ (e)=>{setUbicacion(e.target.value);}} placeholder="Ubicación del producto" />
                                                    <Form.Text className="text-muted"></Form.Text>
                                                </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group >
                                                <Form.Label>Costo de envío</Form.Label>
                                                <Form.Control name="username" value={ precioEnvio } onChange={ (e)=>{setPrecioEnvio(e.target.value);}} type="text" placeholder="Costo de envío" />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group >
                                                <Form.Label>Duración de envío</Form.Label>
                                                <Form.Control name="telefono" value={ tiempoEnvio } onChange={ (e)=>{setTiempoEnvio(e.target.value);}} type="text" placeholder="Tiempo en días de envío" />
                                                <Form.Text className="text-muted"></Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-2 text-right">
                                            <Button variant="info" type="submit" disabled={!validarAlgoCambio()}>
                                                Guardar cambios
                                            </Button>
                                        </Col>
                                    </Row>
                                    
                                </Form>
                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col>
                                        <h5><small><strong>Imágenes</strong></small></h5>
                                    </Col>
                                    <Col md={4} className="text-right">
                                        <Button disabled={validarAgregarImagen()} variant="outline-info" onClick={() => setModalShow(true)}>
                                            Agregar imagen
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form>
                                            <Row>
                                                {imagenes.map( rs => (
                                                    <Col className="mb-2 d-flex justify-content-center" md={6} key={rs.id_foto}>
                                                        <Row className="pt-2">
                                                            <Col className="pt-2 pb-2 " key={rs.id_foto}>
                                                                <Image width="101" height="110" key={rs.id_foto}  src={`/images/files/${rs.url_foto}`} rounded />
                                                            </Col>
                                                            <Col className="text-right   pt-5">
                                                                <Button onClick={(e)=>{handleEliminarIma(e, rs.id_foto);}} size="sm" variant="outline-danger">Eliminar foto</Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                ))}
                                                
                                            </Row>
                                            <Modal show={modalShow} onHide={() => {setModalShow(false)}} aria-labelledby="contained-modal-title-vcenter" centered>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Agregar Imagen</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Row>
                                                        <Col md={12}>
                                                            <Form >
                                                                <Row>
                                                                    <Col md={12} className="pt-2">
                                                                        Elija una imagen de su ordenador
                                                                        <Form.Group className="mt-2">
                                                                            <Form.File id="exampleFormControlFile1" onChange={(e)=>{uploadToClient(e)}}/>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md={6} className="mt-2 text-left">
                                                                    </Col>
                                                                    <Col md={6} className="mt-2 text-right">
                                                                        <Button onClick={handleSaveImage} variant="info">Insertar</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Col>
                                                    </Row>
                                                </Modal.Body>
                                            </Modal>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Tab>
                <Tab eventKey="Comunidad" title="Comunidad">
                    <ComunidadTienda Producto={producto} />
                </Tab>
            </Tabs>
        
    )
}



                