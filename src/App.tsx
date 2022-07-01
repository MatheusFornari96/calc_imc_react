import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem} from './components/GridItem';

import { useCustomToast } from '../src/hooks/useCustomToast';

import {levels, calculateImc, Level} from './helpers/imc';
import { ToastContainer } from 'react-toastify';

const App =() => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const { notify } = useCustomToast();

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
      notify({ message: 'Calculado com sucesso', type: 'success' });
    } else {
      return notify({ message: 'Preencha todos os campos.', type: 'error' });
    }    
  };

  const handleBackButton = () => {
    setToShow(null);
    setWeightField(0);
    setHeightField(0);
  };

  return(
    <div className={styles.main}>
      <ToastContainer />
      <header>
        <div className={styles.headerContainer}>
          {/* <img src={poweredImage} alt="" width={150} /> */}
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
        
          <input 
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input 
            type="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button 
          disabled={toShow ? true : false}
          onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }
          {toShow &&
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} width={25} alt="" />
            </div>
            <GridItem item={toShow}/>
          </div>
          }
        </div>
      </div>

    </div>
  );
}

export default App;