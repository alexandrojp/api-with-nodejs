var list = JSON.parse(sessionStorage.listPanier);

$().ready(function () {

    renderPanier();

    var $badge = $('span.badge');
    $badge.append(list.length);
    
    $('#valider').on('click', function(){
        $('#myTabs a[href="#profile"]').tab('show')
    });
    
});

function renderPanier(){

    var templateListInfo = `<tr>
                                    <td rowspan="2"><img class="i" src=":img:" alt=""></td>
                                    <td colspan="3"><p class="text-capitalize">:name:</p></td>
                                </tr>
                                <tr>
                                    <td>x 1</td>
                                    <td>:price:  €</td>
                                    <td><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></td>
                                </tr>`;

    var templatePanier = `<tr>
                        <td><img class="ip" src=":img:" alt=""</td>
                        <td>
                            <dl>
                            <dt>Description</dt>
                            <dd>:description:</dd>
                            </dl>
                        </td>
                        <td>x 1</td>
                        <td><p>:precio: € sd sd</p></td>
                        <td><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></td>
                    </tr>`;

    var $panier = $('#panier');
    var $listInfo = $('#listInfo');


    $(list).each(function (index, element){
        console.log('index : ', index, ' elemt : ',element);
        $.ajax(`http://localhost:3001/api/product/${element}`, {
            success : function (data){
                var article = templatePanier 
                    .replace(':img:', data.product.picture)
                    .replace(':description:', data.product.description)  
                    .replace(':id:', data.product._id)
                    .replace(':precio:', data.product.price)    
                
                var articleList = templateListInfo
                    .replace(':img:', data.product.picture)
                    .replace(':name:', data.product.name)
                    .replace(':price:', data.product.price)

                $listInfo.append(articleList)
                $panier.append(article);         
            }
        });
    });
}