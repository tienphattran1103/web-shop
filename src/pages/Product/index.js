import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Helmet from '~/components/Helmet';
import Grid from '~/components/Grid';
import ProductCard from '~/components/ProductCard';
import productData from '~/assets/fake-data/products';
import Section, { SectionTitle, SectionBody } from '~/components/Section';
import ProductView from '~/components/ProductView';

function Product() {
    let params = useParams();

    const product = productData.getProductBySlug(params.slug);
    const relatedProducts = productData.getProducts(8);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product}></ProductView>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm liên quan</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {relatedProducts.map((item, index) => (
                            <ProductCard
                                key={index}
                                img01={item.image01}
                                img02={item.image02}
                                title={item.title}
                                price={Number(item.price)}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
}

export default Product;
