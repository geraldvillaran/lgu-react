import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProductHeader from './ProductHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import InventoryTab from './tabs/InventoryTab';
import PricingTab from './tabs/PricingTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import ShippingTab from './tabs/ShippingTab';
import OwnersTab from './tabs/OwnersTab';
import { useGetECommerceProductQuery } from '../ECommerceApi';
import ProductModel from './models/ProductModel';
import { Owner } from '../ECommerceApi'; // Assuming Owner type is exported from ECommerceApi
import LandAppraisalTab from './tabs/LandAppraisalTab';
import OtherImprovementsTab from './tabs/OtherImprovementsTab';
import MarketValueTab from './tabs/MarketValueTab';
import PropertyAssessmentTab from './tabs/PropertyAssessmentTab';

const schema = z.object({
    name: z.string().nonempty('You must enter a product name').min(5, 'The product name must be at least 5 characters')
});

type FormValues = {
    owners: Owner[];
    name: string;
    // Add other fields as needed
};

function Product() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    const routeParams = useParams();
    const { productId } = routeParams;

    const { data: product, isLoading, isError } = useGetECommerceProductQuery(productId, {
        skip: !productId || productId === 'new'
    });

    const [tabValue, setTabValue] = useState(0);

    const methods = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {},
        resolver: zodResolver(schema)
    });

    const { reset, watch, formState } = methods;
    const { dirtyFields, isValid } = formState;

    const form = watch();

    useEffect(() => {
        if (productId === 'new') {
            reset(ProductModel({}));
        }
    }, [productId, reset]);

    useEffect(() => {
        if (product) {
            reset({ ...product });
        }
    }, [product, reset]);

    function handleTabChange(event: SyntheticEvent, value: number) {
        setTabValue(value);
    }

    if (isLoading) {
        return <FuseLoading />;
    }

    if (isError && productId !== 'new') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such product!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Products Page
                </Button>
            </motion.div>
        );
    }

    if (_.isEmpty(form) || (product && routeParams.productId !== product.id && routeParams.productId !== 'new')) {
        return <FuseLoading />;
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<ProductHeader />}
                content={
                    <>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: 'w-full h-64 border-b-1' }}
                        >
                            <Tab className="h-64" label="Basic Info" />
                            <Tab className="h-64" label="Owners" />
                            <Tab className="h-64" label="Property Location" />
                            <Tab className="h-64" label="Property Boundaries" />
                            <Tab className="h-64" label="Land Appraisal" />
                            <Tab className="h-64" label="Other Improvements" />
                            <Tab className="h-64" label="Market Value" />
                            <Tab className="h-64" label="Property Assessment" />
                            <Tab className="h-64" label="Superseded Assessment" />
                        </Tabs>
                        <div className="p-16 sm:p-24 ">
                            {/* max-w-3xl */}
                            <div className={tabValue !== 0 ? 'hidden' : ''}>
                                <BasicInfoTab />
                            </div>
                            <div className={tabValue !== 1 ? 'hidden' : ''}>
                                <OwnersTab />
                            </div>
                            <div className={tabValue !== 2 ? 'hidden' : ''}>
                                <ProductImagesTab />
                            </div>
                            <div className={tabValue !== 3 ? 'hidden' : ''}>
                                <PricingTab />
                            </div>
                            <div className={tabValue !== 4 ? 'hidden' : ''}>
                                <LandAppraisalTab />
                            </div>
                            <div className={tabValue !== 5 ? 'hidden' : ''}>
                                <OtherImprovementsTab />
                            </div>
                            <div className={tabValue !== 6 ? 'hidden' : ''}>
                                <MarketValueTab />
                            </div>
                            <div className={tabValue !== 7 ? 'hidden' : ''}>
                                <PropertyAssessmentTab />
                            </div>
                            <div className={tabValue !== 8 ? 'hidden' : ''}>
                                <PricingTab />
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    );
}

export default Product;
