import {FormInstance} from 'antd'
import {useState} from 'react'
import {useMutation, useQuery} from 'react-query'
import {verifier_get_request, verifier_sent_approve_request} from '~services'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '~store/store'
import {ROLE} from '~common/enum/login'
import {kyc, kycContract} from '~utils/kyc-contract'

export const useRequestPage = () => {
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const role = useSelector((state: RootState) => state.common.role)
    const {isLoading, isError, error, mutate} = useMutation(
        async (user_id: string) => {
            return await verifier_sent_approve_request(user_id);
        },
        {
            onSuccess: async (data, variables, context) => {
                console.log(data);
                await kyc(data.encryptedDataId, data.hash)
            },
            onError: (error, variables, context) => {
                // An error happened!
                console.log(error);
            },
            onSettled: (data, error, variables, context) => {
                // Error or success... doesn't matter!
            },
        }
    )


    const handleApprove = async (id: string) => {
        console.log('hello Approve', id)
        mutate(id);
    }

    const handleReject = async (id: string) => {
        console.log('hello reject', id)

    }

    const fetchData = async () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setList(res.results);
            });
    }

    const onLoadMore = () => {
        // setLoading(true);
        // setList(
        //     data.concat(
        //         [...new Array(count)].map(() => ({
        //             loading: true,
        //             name: {},
        //             picture: {},
        //         })),
        //     ),
        // );
        // fetch(fakeDataUrl)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         const newData = data.concat(res.results);
        //         setData(newData);
        //         setList(newData);
        //         setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        //         // In real scene, you can using public method of react-virtualized:
        //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        //
        //         window.dispatchEvent(new Event('resize'));
        //     });
    };


    return {
        initLoading,
        loading,
        list,
        fetchData,
        onLoadMore,
        handleApprove,
        handleReject
    }
}
