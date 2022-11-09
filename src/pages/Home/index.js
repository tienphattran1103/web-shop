import React from 'react';
import { Link } from 'react-router-dom';

import Helmet from '~/components/Helmet';
import HeroSlider from '~/components/HeroSlider';
import heroSliderData from '~/assets/fake-data/hero-slider';
import Section, { SectionTitle, SectionBody } from '~/components/Section';
import PolicyCard from '~/components/PolicyCard';
import Grid from '~/components/Grid';
import policy from '~/assets/fake-data/policy';
import productData from '~/assets/fake-data/products';
import ProductCard from '~/components/ProductCard';
import banner from '~/assets/images/banner.png';

function Home() {
    return (
        <Helmet title="Trang chủ">
            {/* HeroSlider start*/}
            <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={5000} />
            {/* End HeroSlider */}

            {/* Section start */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {policy.map((item, index) => (
                            <Link key={index} to="/policy">
                                <PolicyCard name={item.name} desc={item.description} icon={item.icon} />
                            </Link>
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Section */}

            {/* Best selling section */}
            <Section>
                <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(4).map((item, index) => (
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
            {/* End best selling section */}

            {/* New products section */}
            <Section>
                <SectionTitle>Sản phẩm mới nhất</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
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
            {/* End new products section */}

            {/* Banner */}
            <Link to={'/catalog'}>
                <img src={banner} alt={'ảnh banner'} />
            </Link>
            {/* End banner */}

            {/* Popular products section */}
            <Section>
                <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(12).map((item, index) => (
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
            {/* End popular products section */}
        </Helmet>
    );
}

export default Home;
