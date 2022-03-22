import { InputText } from 'primereact/inputtext';
import './SearchBox.scss';

interface Props {
    searchValue: string,
    searchCallback: (query: string) => void;
}

export const SearchBox: React.FC<Props> = ({ searchValue = '', searchCallback }) => {
    const onTypedIn = (event: React.FormEvent<HTMLInputElement>) => searchCallback((event.target as HTMLInputElement).value);

    return (
        <div className="search-box" style={{display: 'flex', flexDirection: 'column'}}>
            <span className="p-listbox-filter-icon pi pi-search"></span> 
            <InputText className="search-box__ctrl" onChange={e => onTypedIn(e)} value={searchValue} />
        </div> 
    )
}