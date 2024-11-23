document.addEventListener('DOMContentLoaded', () => {
    const createProductForm = document.getElementById('createProductForm');
    const productList = document.getElementById('products');

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products');
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error al obtener a los productos', error);
        }
    };

    const renderProducts = (products) => {
        productList.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td> 
                    <button class="edit" onclick="updateProduct('${product._id}')">Editar</button>
                    <button class="delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
                </td>
            `).join('');
    };
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value

        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description, price, stock })
            });
            const result = await response.json();
            console.log('Producto creado: ', result);
            fetchProducts();
            createProductForm.reset();
        } catch (error) {
            console.error('Error al crear un producto', error);
        }
    });

    window.updateProduct = async (id) => {
        const price = prompt('Nuevo precio');
        const stock = prompt('Nuevo stock');

        if(!price || !stock) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los campos son requeridos para actualizar'
            }); 
        }
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ price, stock })
        });
        const result = await response.json();
        console.log('Producto actualizado: ', result);
        fetchProducts();
        } catch(error) {
            console.error('Error al actualizar el producto:', error);
        }
    }
    window.deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE'
        });
        const result = await response.json();
        console.log('Producto elimando: ', result);
        fetchProducts();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
    fetchProducts();
});